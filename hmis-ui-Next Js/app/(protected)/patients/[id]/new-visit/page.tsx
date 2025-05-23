"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 🔁 Hook
import { useQueue } from "@/hooks/useQueue";

export default function NewVisitPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // 🧠 State for form fields including que selection
  const [visitData, setVisitData] = useState({
    visit_type: "OPD",
    reason_for_visit: "",
    status: "scheduled",
    que: "", // This will hold the department name like "Emergency"
  });

  // 🔁 Hook to add to queue
  const { addToQueue } = useQueue();

  // 📥 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisitData((prev) => ({ ...prev, [name]: value }));
  };

  // 📦 Handle select changes
  const handleSelectChange = (value: string, field: string) => {
    setVisitData((prev) => ({ ...prev, [field]: value }));
  };

  // 💾 Submit handler
  const handleSubmit = async () => {
    const token = localStorage.getItem("auth_tokens")
      ? JSON.parse(localStorage.getItem("auth_tokens") as string).access
      : null;

    if (!token) {
      alert("You are not logged in.");
      router.push("/login");
      return;
    }

    const body = {
      patient: parseInt(id),
      visit_type: visitData.visit_type || "OPD",
      reason_for_visit: visitData.reason_for_visit || "",
      status: visitData.status || "scheduled",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/visits/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const contentType = res.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const htmlText = await res.text();
        console.error("Received HTML instead of JSON:", htmlText);
        alert("❌ Authentication failed. Please log in again.");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          detail: "Unknown error occurred",
        }));

        let errorMessage = "Failed to create visit.\n";

        if (errorData.visit_type) {
          errorMessage += `Visit Type: ${errorData.visit_type.join(", ")}\n`;
        }
        if (errorData.patient) {
          errorMessage += `Patient: ${errorData.patient.join(", ")}\n`;
        }
        if (errorData.reason_for_visit) {
          errorMessage += `Reason for Visit: ${errorData.reason_for_visit.join(
            ", "
          )}\n`;
        }

        alert(errorMessage);
        return;
      }

      const result = await res.json();

      // ✅ If user selected a queue, add them to it
      if (visitData.que) {
        const success = await addToQueue(result.id.toString(), visitData.que);
        if (!success.ok) {
          alert("⚠️ Visit created but failed to add to queue.");
        }
      }

      alert("✅ Visit created successfully!");
      router.push(`/visits/${result.id}`);
    } catch (err: any) {
      console.error("Network error:", err.message);
      alert("❌ Network error. Could not reach server.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>New Visit for Patient</CardTitle>
          <CardDescription>Patient ID: {id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Visit Type */}
          <div className="space-y-2">
            <Label htmlFor="visit_type">Visit Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "visit_type")}
              defaultValue={visitData.visit_type}
            >
              <SelectTrigger id="visit_type">
                <SelectValue placeholder="Select Visit Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPD">Outpatient Department</SelectItem>
                <SelectItem value="IPD">Inpatient Department</SelectItem>
                <SelectItem value="ER">Emergency Room</SelectItem>
                <SelectItem value="ANC">Antenatal Care</SelectItem>
                <SelectItem value="PNC">Postnatal Care</SelectItem>
                <SelectItem value="VCT">
                  Voluntary Counseling & Testing
                </SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2">
            <Label htmlFor="reason_for_visit">Reason for Visit</Label>
            <Input
              id="reason_for_visit"
              name="reason_for_visit"
              value={visitData.reason_for_visit}
              onChange={handleChange}
              placeholder="E.g., Chest pain, routine checkup"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "status")}
              defaultValue={visitData.status}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="referred">Referred to Specialist</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Queue Selection */}
          <div className="space-y-2">
            <Label htmlFor="que">Add to Queue</Label>
            <Select
              onValueChange={(val) => handleSelectChange(val, "que")}
              value={visitData.que}
            >
              <SelectTrigger id="que">
                <SelectValue placeholder="Select Queue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Triage">Triage</SelectItem>
                <SelectItem value="OPD">Outpatient Department</SelectItem>
                <SelectItem value="Emergency">Emergency Department</SelectItem>
                <SelectItem value="VIP">VIP Department</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Pharmacy">Pharmacy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Start Visit</Button>
      </div>
    </div>
  );
}
