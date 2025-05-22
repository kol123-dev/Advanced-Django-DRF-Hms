import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getPatientDetails, Patient } from "@/lib/api/patient";

export function usePatientDetails(patientId: string) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPatient() {
      try {
        const data = await getPatientDetails(patientId);
        setPatient(data);
      } catch (err: any) {
        console.error("Error loading patient:", err.message);
        setError(err.message);
        if (err.message === "Patient not found") {
          router.push("/patients");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [patientId]);

  return { patient, loading, error };
}
