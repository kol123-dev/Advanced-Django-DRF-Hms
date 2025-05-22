// src/hooks/useCurrentUser.ts
import { useEffect, useState } from "react";
import type { ProfileData } from "@/lib/api/user-profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCurrentUser() {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      // ✅ Early return if component unmounted or no token
      if (!isMounted) return;

      const token = localStorage.getItem("auth_tokens")
        ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
        : null;

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            // 🔐 Token is invalid or expired — clear tokens
            localStorage.removeItem("auth_tokens");
          }
          throw new Error(`Failed to fetch user: ${res.status}`);
        }

        const data: ProfileData = await res.json();
        if (isMounted) setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUser();

    return () => {
      isMounted = false; // ✅ Prevent state updates on unmounted component
    };
  }, []);

  return { user, loading };
}
