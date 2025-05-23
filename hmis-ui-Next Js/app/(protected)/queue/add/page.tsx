"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQueue } from "@/hooks/useQueue";

// 🔁 API
import { addPatientToQueue as apiAddToQueue } from "@/lib/api/queue";

export default function AddToQueuePage() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [visits, setVisits] = useState<{ id: number; date: string }[]>([]);
  const [selectedVisitId, setSelectedVisitId] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔁 Use the hook just for utility
  const { addToQueue } = useQueue();

  // 🧠 Mocked patients – replace this with real data later
  const patients = [
    { value: "1", label: "Jeremiah Kanda" },
    { value: "2", label: "Sarah Smith" },
    { value: "3", label: "Eizabeth Wangari" },
    { value: "4", label: "Daniel Ochieng" },
    { value: "6", label: "Amina Hassan" },
  ];

  // 🧠 When patient changes, fetch visits
  const handlePatientChange = async (patientId: string) => {
    setSelectedPatient(patientId);
    setLoading(true);

    try {
      // Replace with actual API call like:
      // const res = await fetch(`/api/patients/${patientId}/visits`);
      // const data = await res.json();
      // For now, simulate fetching visits
      const mockVisits = [
        { id: 10, date: "2025-05-20T12:56:31.605226+03:00" },
        { id: 9, date: "2025-05-18T12:56:31.605226+03:00" },
      ];

      setVisits(mockVisits);
      if (mockVisits.length > 0) {
        setSelectedVisitId(mockVisits[0].id.toString()); // auto-select latest
      }
    } catch (err) {
      console.error("Failed to load visits:", err);
      alert("❌ Failed to load visits");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedVisitId || !department) {
      alert("⚠️ Please select both visit and department.");
      return;
    }

    setLoading(true);

    try {
      const result = await apiAddToQueue(selectedVisitId, department);

      if (result.ok) {
        alert("✅ Successfully added to queue!");
        setSelectedVisitId("");
        setDepartment("");
        setSelectedPatient("");
        setVisits([]);
      } else {
        alert("❌ Failed to add to queue.");
      }
    } catch (err) {
      console.error("Error adding to queue:", err);
      alert("❌ Network error. Could not reach server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/queue">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add to Queue</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue Details</CardTitle>
          <CardDescription>Add a patient to the waiting queue</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Patient Selection */}
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select
                  onValueChange={handlePatientChange}
                  value={selectedPatient}
                >
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Visit Selection */}
              <div className="space-y-2">
                <Label htmlFor="visit">Visit ID</Label>
                <Select
                  onValueChange={setSelectedVisitId}
                  value={selectedVisitId}
                  disabled={!visits.length}
                >
                  <SelectTrigger id="visit">
                    <SelectValue placeholder="Select visit" />
                  </SelectTrigger>
                  <SelectContent>
                    {visits.length > 0 ? (
                      visits.map((v) => (
                        <SelectItem key={v.id} value={v.id.toString()}>
                          Visit #{v.id} • {new Date(v.date).toLocaleString()}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No visits found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Department Selection */}
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={setDepartment} value={department}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Triage">Triage</SelectItem>
                    <SelectItem value="Internal Medicine">
                      Internal Medicine
                    </SelectItem>
                    <SelectItem value="General Surgery">
                      General Surgery
                    </SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Gynecology">Gynecology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Laboratory">Laboratory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!department || !selectedVisitId || loading}
          >
            {loading ? "Adding..." : "Add to Queue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
