// lib/api/patient.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Patient = {
  id: number;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO string
  gender: "M" | "F" | "O";
  blood_group: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  notes: string | null;
  mode_of_payment: "cash" | "insurance";
  insurance: string;
  discharged_time: string | null;
  chronic_conditions: ChronicCondition[];
  allergies: Allergy[];
  surgical_history: SurgicalHistory[];
  family_history: FamilyHistory[];
  visits: VisitSummary[];
};

export type VisitSummary = {
  id: number;
  start_time: string;
  visit_type: string;
  status: string;
  reason_for_visit: string | null;
  referring_doctor: number | null;
};

export type ChronicCondition = {
  id: number;
  condition: string;
  diagnosed_date: string;
};

export type Allergy = {
  id: number;
  allergen: string;
  severity: string;
  reaction: string;
};

export type SurgicalHistory = {
  id: number;
  procedure: string;
  date_performed: string;
  surgeon: string;
};

export type FamilyHistory = {
  id: number;
  relative: string;
  condition: string;
};

export type CreatePatientData = Omit<
  Patient,
  | "id"
  | "mrn"
  | "age"
  | "chronic_conditions"
  | "allergies"
  | "surgical_history"
  | "family_history"
  | "visits"
  | "discharged_time"
> & {
  que?: number;
};

export type UpdatePatientData = Partial<Omit<Patient, "id" | "mrn" | "visits">>;

/**
 * Creates a new patient
 */
/**
 * Creates a new patient
 */
export async function createPatient(
  data: CreatePatientData
): Promise<{ ok: boolean; patientId?: number }> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/patients/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const errorData = await res.json().catch(() => ({
        detail: "Unknown JSON error",
      }));
      console.error("Validation Error:", errorData);
      throw new Error(JSON.stringify(errorData));
    } else {
      const htmlText = await res.text();
      console.error("Unexpected HTML Response:", htmlText);
      throw new Error("Authentication failed. Redirecting...");
    }
  }

  const result = await res.json();

  return { ok: true, patientId: result.id };
}
// ✅ Make sure this function is defined and exported
export async function getPatientDetails(id: string): Promise<Patient> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Patient not found");
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error(`Failed to load patient: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Fetches list of all patients with their visits
 */
export async function getAllPatients(): Promise<Patient[]> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/patients/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to load patients");

  const data = await res.json();

  return data.map((p: any) => ({
    ...p,
    visits: p.visits || [], // Ensure visits is always an array
  }));
}

/**
 * Updates an existing patient
 */
export async function updatePatient(
  id: string,
  data: UpdatePatientData
): Promise<boolean> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  const res = await fetch(`${API_URL}/api/patients/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.ok;
}
