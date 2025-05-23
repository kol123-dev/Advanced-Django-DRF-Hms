// lib/api/queue.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔁 Types
import type { QueueEntry, QueuePatient, QueueStatus } from "../types/queue";

// 💡 Helper functions
function calculateWaitTime(arrivalTimeString: string): number {
  const arrivalTime = new Date(arrivalTimeString);
  const now = new Date();
  const diffMs = now.getTime() - arrivalTime.getTime();
  return Math.floor(diffMs / 60000);
}

function formatArrival(arrivalTimeString: string): string {
  const arrivalTime = new Date(arrivalTimeString);
  return arrivalTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * 🔁 Get all queue entries
 */
export async function getAllQueuePatients(): Promise<QueuePatient[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/queue/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load queue");

  const data: QueueEntry[] = await res.json();

  return data.map((entry) => ({
    id: entry.id,
    name: `${entry.visit.patient.first_name} ${entry.visit.patient.last_name}`,
    avatar: "/placeholder.svg",
    department: entry.department,
    doctor: entry.assigned_to?.email || "Unassigned",
    priority: entry.priority,
    status: entry.status,
    waitTime: calculateWaitTime(entry.arrival_time),
    arrivalTime: formatArrival(entry.arrival_time),
  }));
}

/**
 * 🔁 Get queue entries filtered by department
 */
export async function getQueueByDepartment(
  department: string
): Promise<QueuePatient[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/queue?department=${department}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to load queue for ${department}`);

  const data: QueueEntry[] = await res.json();

  return data.map((entry) => ({
    id: entry.id,
    name: `${entry.visit.patient.first_name} ${entry.visit.patient.last_name}`,
    avatar: "/placeholder.svg",
    department: entry.department,
    doctor: entry.assigned_to?.email || "Unassigned",
    priority: entry.priority,
    status: entry.status,
    waitTime: calculateWaitTime(entry.arrival_time),
    arrivalTime: formatArrival(entry.arrival_time),
  }));
}

/**
 * 🔁 Get all queue entries for a specific visit
 */
export async function getQueueForVisit(visitId: string): Promise<QueueEntry[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/${visitId}/queue`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load visit queue");

  return await res.json();
}

/**
 * 🔁 Add a new queue entry for a visit
 */

export async function addPatientToQueue(
  visitId: string,
  department: string
): Promise<{ ok: boolean; queueId?: number }> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/${visitId}/queue/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      visit: parseInt(visitId), // ✅ Required by backend
      department, // ✅ Department name (must match choices)
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({
      detail: "Unknown error",
    }));
    console.error("Add to Queue Error:", errorData);
    return { ok: false };
  }

  const result = await res.json();
  return { ok: true, queueId: result.id };
}
/**
 * 🔁 Update queue entry (status, department, etc.)
 */
export async function updateQueueEntry(
  id: string,
  data: Partial<QueueEntry>
): Promise<boolean> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/queue/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.ok;
}

/**
 * 🗑 Remove queue entry
 */
export async function deleteQueueEntry(id: string): Promise<boolean> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/queue/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}

/**
 * 📊 Get summary stats
 */
export async function getQueueStats() {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/queue/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load queue stats");

  return await res.json();
}
