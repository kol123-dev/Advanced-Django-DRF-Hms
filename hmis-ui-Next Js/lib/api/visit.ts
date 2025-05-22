// lib/api/visit.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//patient type

export type Patient = {
  id: number;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
};
//visit type
export type Visit = {
  id: number;
  start_time: string;
  end_time: string | null;
  visit_type: string;
  status: string;
  reason_for_visit: string | null;
  referring_doctor: number | null;
  notes: string | null;
  patient: number | Patient;

  // Clinical Records
  vitals: Vitals[];
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
  lab_orders: LabTestOrder[];
  radiology_orders: RadiologyOrder[];
  procedures: Procedure[];
  referrals: Referral[];
  followups: FollowUp[];
  notes_list: Note[];
};

export type Vitals = {
  id: number;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  temperature: number | null;
  heart_rate: number | null;
  respiratory_rate: number | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  recorded_at: string;
};

export type Diagnosis = {
  id: number;
  condition: string;
  code: string | null;
  is_primary: boolean;
  notes: string | null;
  diagnosed_by: number | null;
  diagnosed_at: string;
};

export type Prescription = {
  id: number;
  drug: number;
  dosage: string;
  frequency: string;
  duration_days: number | null;
  prescribed_by: number | null;
  prescribed_at: string;
  is_dispensed: boolean;
  dispensed_at: string | null;
};

export type LabTestOrder = {
  id: number;
  test_type: number;
  priority: string;
  status: string;
  ordered_at: string;
  completed_at: string | null;
  visit: number;
};

export type RadiologyOrder = {
  id: number;
  radiology_type: number;
  ordered_by: number | null;
  ordered_at: string;
  completed_at: string | null;
  visit: number;
};

export type Procedure = {
  id: number;
  name: string;
  description: string;
  performed_by: number | null;
  performed_at: string;
  notes: string | null;
};

export type Referral = {
  id: number;
  to_location: number | null;
  from_provider: number | null;
  reason: string;
  notes: string | null;
  referred_at: string;
  follow_up_date: string | null;
};

export type FollowUp = {
  id: number;
  scheduled_for: string;
  reason: string;
  assigned_to: number | null;
  notes: string | null;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  author: number | null;
  created_at: string;
};

/**
 * Fetches visits for a specific patient
 */
export async function getPatientVisits(patientId: string): Promise<Visit[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/?patient=${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load patient visits");

  const data = await res.json();

  // 🔁 Ensure we're handling both cases: patient as object or ID
  return data.map((visit: Visit) => ({
    ...visit,
    patient:
      typeof visit.patient === "object" ? visit.patient.id : visit.patient,
  }));
}
/**
 * Fetches single visit by ID
 */
export async function getVisitDetails(visitId: string): Promise<Visit> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/${visitId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Visit not found");
    throw new Error(`Failed to load visit: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Creates a new visit
 */
export async function createVisit(data: {
  patient: number;
  visit_type?: string;
  reason_for_visit?: string;
}): Promise<{ ok: boolean; visitId?: number }> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...data,
      visit_type: data.visit_type || "OPD",
      reason_for_visit: data.reason_for_visit || "",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({
      detail: "Unknown error occurred",
    }));
    throw new Error(errorData.detail || "Failed to create visit");
  }

  const result = await res.json();
  return { ok: true, visitId: result.id };
}

/**
 * Updates an existing visit
 */
export async function updateVisit(
  id: string,
  data: Partial<Visit>
): Promise<boolean> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/${id}/`, {
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
 * Deletes a visit
 */
export async function deleteVisit(id: string): Promise<boolean> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}

export async function getAllVisits(): Promise<Visit[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/visits/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load visits");

  return await res.json();
}
