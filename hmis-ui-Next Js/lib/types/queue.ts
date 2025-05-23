// lib/types/queue.ts

export type QueueStatus =
  | "Waiting"
  | "In Progress"
  | "Completed"
  | "Transferred";

export type QueuePatient = {
  id: number;
  name: string;
  avatar?: string;
  department: string;
  doctor: string;
  priority: "Normal" | "Urgent" | "Emergency";
  status: QueueStatus;
  waitTime: number; // minutes
  arrivalTime: string; // e.g., "09:15 AM"
};

export type QueueEntry = {
  id: number;
  visit: {
    id: number;
    patient: {
      id: number;
      first_name: string;
      last_name: string;
      date_of_birth: string; // ISO date string
      gender: string;
      blood_group: string | null;
      age: number;
      phone: string;
      email: string;
      // Include other fields if needed later
    };
    // You can add other visit fields here as necessary
  };
  department: string;
  assigned_to: {
    id: number;
    email: string;
    role: string;
    is_active: boolean;
    is_staff: boolean;
  } | null;
  priority: "Normal" | "Urgent" | "Emergency";
  status: QueueStatus;
  arrival_time: string; // ISO datetime
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
};

// 🔁 Update this to match backend response
export type QueueStats = {
  total_waiting: number;
  average_wait_time_minutes: number;
  filtered_queue_count: number;

  by_department: Record<string, number>;
  by_priority: Record<string, number>;
  by_status: Record<string, number>;
};
