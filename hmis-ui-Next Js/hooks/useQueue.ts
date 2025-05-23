// lib/hooks/useQueue.ts
import { useState, useEffect } from "react";

// 🔁 API
import {
  getAllQueuePatients,
  getQueueByDepartment,
  getQueueForVisit,
  addPatientToQueue as apiAddToQueue,
  updateQueueEntry,
  deleteQueueEntry,
  getQueueStats,
} from "@/lib/api/queue";

// 🔁 Types
import type { QueuePatient, QueueStatus, QueueEntry } from "@/lib/types/queue";

// 🧠 Queue stats response
export type QueueStats = {
  total_waiting: number;
  average_wait_time_minutes: number;
  filtered_queue_count: number;

  by_department: Record<string, number>;
  by_priority: Record<string, number>;
  by_status: Record<string, number>;
} & {
  waiting?: number;
  completed?: number;
  inProgress?: number;
  averageWaitTime?: number;
};

interface UseQueueReturn {
  queue: QueuePatient[];
  loading: boolean;
  error: Error | null;
  stats: QueueStats | null;
  refetch: () => Promise<void>;

  addToQueue: (
    visitId: string,
    department: string
  ) => Promise<{ ok: boolean; queueId?: number }>;
  updateQueueStatus: (
    id: string,
    updates: Partial<Pick<QueueEntry, "status" | "department" | "assigned_to">>
  ) => Promise<boolean>;
  removeQueueEntry: (id: string) => Promise<boolean>;
  updatePriority: (
    id: string,
    newPriority: "Normal" | "Urgent" | "Emergency"
  ) => Promise<boolean>;
  transferDepartment: (id: string, newDepartment: string) => Promise<boolean>;
}

export function useQueue(
  department?: string,
  visitId?: string
): UseQueueReturn {
  const [queue, setQueue] = useState<QueuePatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<QueueStats | null>(null);

  // Existing fetchData logic unchanged...

  const fetchData = async () => {
    try {
      setLoading(true);
      let data: QueuePatient[] = [];

      if (visitId) {
        const result = await getQueueForVisit(visitId);
        data = result.map((entry) => ({
          id: entry.id,
          name: `${entry.visit.patient.first_name} ${entry.visit.patient.last_name}`,
          avatar: "/placeholder.svg",
          department: entry.department,
          doctor: entry.assigned_to?.email || "Unassigned",
          priority: entry.priority,
          status: entry.status,
          waitTime: 0,
          arrivalTime: "",
        }));
      } else if (department) {
        data = await getQueueByDepartment(department);
      } else {
        data = await getAllQueuePatients();
      }

      setQueue(data);

      const statsData = await getQueueStats();

      const enhancedStats = {
        ...statsData,
        waiting: statsData.by_status.Waiting || 0,
        completed: statsData.by_status.Completed || 0,
        inProgress: statsData.by_status["In Progress"] || 0,
        averageWaitTime: statsData.average_wait_time_minutes,
      };

      setStats(enhancedStats);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [department, visitId]);

  // ✅ Update Priority
  const updatePriority = async (
    id: string,
    newPriority: "Normal" | "Urgent" | "Emergency"
  ): Promise<boolean> => {
    const success = await updateQueueEntry(id, { priority: newPriority });
    if (success) await fetchData();
    return success;
  };

  // ✅ Transfer Department
  const transferDepartment = async (
    id: string,
    newDepartment: string
  ): Promise<boolean> => {
    const success = await updateQueueEntry(id, {
      department: newDepartment,
      status: "Waiting",
    });
    if (success) await fetchData();
    return success;
  };

  // ✅ Add to Queue
  const addToQueue = async (
    visitId: string,
    department: string
  ): Promise<{ ok: boolean; queueId?: number }> => {
    const result = await apiAddToQueue(visitId, department);
    if (result.ok) await fetchData();
    return result;
  };

  // ✅ Update status (with start_time or end_time)
  const updateQueueStatus = async (
    id: string,
    updates: Partial<Pick<QueueEntry, "status" | "department" | "assigned_to">>
  ): Promise<boolean> => {
    const success = await updateQueueEntry(id, updates);
    if (success) await fetchData();
    return success;
  };

  // ✅ Delete queue entry
  const removeQueueEntry = async (id: string): Promise<boolean> => {
    const success = await deleteQueueEntry(id);
    if (success) await fetchData();
    return success;
  };

  return {
    queue,
    loading,
    error,
    stats,
    refetch: fetchData,

    addToQueue,
    updateQueueStatus,
    removeQueueEntry,

    // ✅ Exported actions
    updatePriority,
    transferDepartment,
  };
}
