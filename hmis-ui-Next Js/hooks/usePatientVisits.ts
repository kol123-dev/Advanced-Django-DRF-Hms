import { useEffect, useState } from "react";
import { getPatientVisits, Visit } from "@/lib/api/visit";

export function usePatientVisits(patientId: string) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPatientVisits(patientId); // ✅ Directly fetch filtered visits
        setVisits(data);
      } catch (err: any) {
        console.error("Error loading visits:", err.message);
        setError(err.message || "Failed to load visits");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [patientId]);

  return { visits, loading, error };
}
