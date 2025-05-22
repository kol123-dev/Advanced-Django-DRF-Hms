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
  visit: number;
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
