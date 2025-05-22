"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

// 🔁 Import types and API functions
import {
  fetchProfile,
  updateProfile,
  ProfileData,
  API_URL,
} from "@/lib/api/user-profile";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // 🧠 Load profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchProfile();
        setProfile(data);
        if (data.profile.join_date) {
          setDate(new Date(data.profile.join_date));
        }
      } catch (err) {
        console.error("Failed to load profile", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading || !profile) {
    return <div className="p-6">Loading...</div>;
  }

  // 📝 Split education/certifications by newline into array
  const parseMultiline = (text: string | null | undefined): string[] =>
    text ? text.split("\n").filter(Boolean) : [];

  // 🖋️ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev!,
      profile: {
        ...prev!.profile,
        [name]: value,
      },
    }));
  };

  // 🗓️ Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (!newDate) return;

    setProfile((prev) => ({
      ...prev!,
      profile: {
        ...prev!.profile,
        join_date: newDate.toISOString(),
      },
    }));
  };

  // 🧾 Handle select change (e.g., department)
  const handleSelectChange = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev!,
      profile: {
        ...prev!.profile,
        [key]: value,
      },
    }));
  };

  // 💾 Save updated profile
  const handleSave = async () => {
    try {
      await updateProfile(profile);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      alert("❌ Failed to save profile. Please try again.");
    }
  };

  // 🧮 Combine title and full_name
  const displayName = profile.profile.title
    ? `${profile.profile.title} ${profile.profile.full_name}`
    : profile.profile.full_name || profile.email;

  // 🖼️ Avatar fallback
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarSrc = profile.profile.profile_photo
    ? `${API_URL}${profile.profile.profile_photo}`
    : "/placeholder.svg?height=128&width=128";

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{displayName}</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Personal Info Card */}
      <Card>
        <CardHeader className="bg-muted/30 rounded-t-lg border-b py-3">
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  name="full_name"
                  value={profile.profile.full_name || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.full_name || "N/A"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              {isEditing ? (
                <Input
                  id="title"
                  name="title"
                  value={profile.profile.title || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.title || "N/A"}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              ) : (
                <div className="text-base">{profile.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={profile.profile.phone || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.phone || "N/A"}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              {isEditing ? (
                <select
                  id="gender"
                  name="gender"
                  value={profile.profile.gender || "other"}
                  onChange={(e) => handleSelectChange("gender", e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="text-base">
                  {profile.profile.gender || "N/A"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              {isEditing ? (
                <Input
                  id="nationality"
                  name="nationality"
                  value={profile.profile.nationality || "Kenyan"}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.nationality || "Kenyan"}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                name="bio"
                value={profile.profile.bio || ""}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <div className="text-base whitespace-pre-line">
                {profile.profile.bio || "No bio available."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact Card */}
      <Card>
        <CardHeader className="bg-muted/30 rounded-t-lg border-b py-3">
          <CardTitle className="text-lg">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">Name</Label>
              {isEditing ? (
                <Input
                  id="emergency_contact_name"
                  name="emergency_contact_name"
                  value={profile.profile.emergency_contact_name || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.emergency_contact_name || "Not Set"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_relationship">
                Relationship
              </Label>
              {isEditing ? (
                <Input
                  id="emergency_contact_relationship"
                  name="emergency_contact_relationship"
                  value={profile.profile.emergency_contact_relationship || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.emergency_contact_relationship || "Spouse"}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="emergency_contact_phone"
                  name="emergency_contact_phone"
                  value={profile.profile.emergency_contact_phone || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.emergency_contact_phone || "N/A"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_email">Email</Label>
              {isEditing ? (
                <Input
                  id="emergency_contact_email"
                  name="emergency_contact_email"
                  type="email"
                  value={profile.profile.emergency_contact_email || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.emergency_contact_email || "N/A"}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Info Card */}
      <Card>
        <CardHeader className="bg-muted/30 rounded-t-lg border-b py-3">
          <CardTitle className="text-lg">Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              {isEditing ? (
                <Input
                  id="specialty"
                  name="specialty"
                  value={profile.profile.specialty || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.specialty || "N/A"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              {isEditing ? (
                <select
                  id="department"
                  name="department"
                  value={profile.profile.department || ""}
                  onChange={(e) =>
                    handleSelectChange("department", e.target.value)
                  }
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="obstetrics">Obstetrics</option>
                  <option value="surgery">Surgery</option>
                  <option value="emergency">Emergency</option>
                  <option value="ophthalmology">Ophthalmology</option>
                </select>
              ) : (
                <div className="text-base">
                  {profile.profile.department || "N/A"}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license_number">License Number</Label>
              {isEditing ? (
                <Input
                  id="license_number"
                  name="license_number"
                  value={profile.profile.license_number || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="text-base">
                  {profile.profile.license_number || "N/A"}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="text-base">
                  {profile.profile.join_date
                    ? format(new Date(profile.profile.join_date), "PPP")
                    : "N/A"}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Certifications Card */}
      <Card>
        <CardHeader className="bg-muted/30 rounded-t-lg border-b py-3">
          <CardTitle className="text-lg">Education & Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            {isEditing ? (
              <Textarea
                id="education"
                name="education"
                value={profile.profile.education || ""}
                onChange={handleChange}
                placeholder="Enter each degree on a new line\nExample:\nMD, Internal Medicine\nPhD, Cardiology"
                rows={4}
              />
            ) : (
              <>
                {parseMultiline(profile.profile.education).length > 0 ? (
                  parseMultiline(profile.profile.education).map((edu, i) => (
                    <p key={i}>{edu}</p>
                  ))
                ) : (
                  <p className="text-muted-foreground">No education details</p>
                )}
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label>Certifications</Label>
            {isEditing ? (
              <Textarea
                id="certifications"
                name="certifications"
                value={profile.profile.certifications || ""}
                onChange={handleChange}
                placeholder="Enter each certification on a new line\nExample:\nBoard Certified - ACC\nFACC, FACP"
                rows={4}
              />
            ) : (
              <>
                {parseMultiline(profile.profile.certifications).length > 0 ? (
                  parseMultiline(profile.profile.certifications).map(
                    (cert, i) => <p key={i}>{cert}</p>
                  )
                ) : (
                  <p className="text-muted-foreground">No certifications</p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}
