// lib/user-profile.ts

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ProfileData = {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  is_staff: boolean;
  profile: {
    full_name: string;
    title: string | null; // e.g., Dr., Prof., Mr., Ms.
    gender: string | null;
    date_of_birth: string | null;
    nationality: string | null;
    phone: string | null;
    tel: string | null;
    specialty: string | null;
    department: string | null;
    license_number: string | null;
    join_date: string; // ISO date string
    bio: string | null;
    emergency_contact_name: string | null;
    emergency_contact_relationship: string | null;
    emergency_contact_phone: string | null;
    emergency_contact_email: string | null;
    education: string | null;
    certifications: string | null;
    profile_photo: string | null;
    user: number; // user ID
  };
};

/**
 * Fetches current user's profile data
 */
export async function fetchProfile(): Promise<ProfileData> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_URL}/api/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await res.json();
}

/**
 * Updates user profile on the server
 */
export async function updateProfile(
  data: Partial<ProfileData>
): Promise<ProfileData> {
  const token = localStorage.getItem("auth_tokens")
    ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
    : null;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${API_URL}/api/me/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return await res.json();
}
