"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createPatient, CreatePatientData } from "@/lib/api/patient";

export default function AddPatientPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreatePatientData>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "M",
    blood_group: "",
    phone: "",
    email: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    notes: "",
    mode_of_payment: "cash",
    insurance: "",
    que: undefined, // ✅ Changed to undefined (not null)
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    let newValue: any = value;

    if (field === "que") {
      newValue = value ? parseInt(value) : undefined;
    }

    if (field === "mode_of_payment") {
      newValue = value as "cash" | "insurance";
    }

    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      // ✅ Make sure que is not sent as null
      const submitData = {
        ...formData,
        que: formData.que || undefined,
      };

      const response = await createPatient(submitData);
      alert("✅ Patient created successfully!");
      router.push(`/patients/${response.patientId}/details`);
    } catch (err: any) {
      console.error("Error creating patient:", err.message);
      alert(`❌ Failed to create patient: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Patient Registration</CardTitle>
          <CardDescription>
            Enter the new patient's personal and medical details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(val) => handleSelectChange(val, "gender")}
                defaultValue={formData.gender}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="O">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mode of Payment & Insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mode_of_payment">Mode of Payment</Label>
              <Select
                onValueChange={(val) =>
                  handleSelectChange(val, "mode_of_payment")
                }
                defaultValue={formData.mode_of_payment} // ✅ Will always be "cash" or "insurance"
              >
                <SelectTrigger id="mode_of_payment">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance Provider</Label>
              <Input
                id="insurance"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                disabled={formData.mode_of_payment !== "insurance"}
                placeholder="e.g., NHIF"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+2547..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, Nairobi"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2">
            <Label htmlFor="emergency-contact-name">
              Emergency Contact Name
            </Label>
            <Input
              id="emergency_contact_name"
              name="emergency_contact_name"
              value={formData.emergency_contact_name || ""}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-contact-phone">
              Emergency Contact Phone
            </Label>
            <Input
              id="emergency_contact_phone"
              name="emergency_contact_phone"
              value={formData.emergency_contact_phone || ""}
              onChange={handleChange}
              placeholder="+254798765432"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Any additional notes..."
            />
          </div>

          {/* Que Selection */}
          <div className="space-y-2">
            <Label htmlFor="que">Que</Label>
            <Select
              onValueChange={(val) => handleSelectChange(val, "que")}
              defaultValue={formData.que?.toString() || ""}
            >
              <SelectTrigger id="que">
                <SelectValue placeholder="Select Que" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">OPD Que</SelectItem>
                <SelectItem value="2">Emergency Que</SelectItem>
                <SelectItem value="3">VIP Que</SelectItem>
                <SelectItem value="4">Insurance Que</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/patients">Cancel</Link>
          </Button>
          <Button onClick={handleSubmit} type="button">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
