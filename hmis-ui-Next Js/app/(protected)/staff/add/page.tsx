"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const staffTypes = [
  { id: "doctors", label: "Doctor" },
  { id: "nurses", label: "Nurse" },
  { id: "receptionists", label: "Receptionist" },
  { id: "clinical-officers", label: "Clinical Officer" },
  { id: "lab-technicians", label: "Lab Technician" },
  { id: "pharmacists", label: "Pharmacist" },
  { id: "radiologists", label: "Radiologist" },
  { id: "dentists", label: "Dentist" },
]

const departments = [
  { id: "cardiology", label: "Cardiology" },
  { id: "orthopedics", label: "Orthopedics" },
  { id: "neurology", label: "Neurology" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "obstetrics", label: "Obstetrics" },
  { id: "surgery", label: "Surgery" },
  { id: "emergency", label: "Emergency" },
  { id: "radiology", label: "Radiology" },
  { id: "laboratory", label: "Laboratory" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "dental", label: "Dental" },
  { id: "administration", label: "Administration" },
  { id: "intensive-care", label: "Intensive Care" },
  { id: "outpatient", label: "Outpatient" },
]

// Specialty options based on staff type
const specialties = {
  doctors: [
    "Cardiologist",
    "Orthopedic Surgeon",
    "Neurologist",
    "Pediatrician",
    "Obstetrician",
    "General Surgeon",
    "Emergency Physician",
    "Psychiatrist",
    "Dermatologist",
    "Ophthalmologist",
    "Gastroenterologist",
  ],
  nurses: [
    "Registered Nurse",
    "Nurse Practitioner",
    "Pediatric Nurse",
    "ICU Nurse",
    "Surgical Nurse",
    "Emergency Nurse",
    "Obstetric Nurse",
    "Oncology Nurse",
    "Geriatric Nurse",
  ],
  receptionists: ["Front Desk", "Patient Registration", "Appointment Scheduling", "Medical Records"],
  "clinical-officers": ["General Practice", "Pediatrics", "Emergency Care", "Outpatient Care"],
  "lab-technicians": ["Hematology", "Microbiology", "Biochemistry", "Pathology", "Immunology"],
  pharmacists: ["Clinical Pharmacist", "Oncology Pharmacist", "Pediatric Pharmacist", "Emergency Pharmacist"],
  radiologists: ["Diagnostic Radiology", "Interventional Radiology", "Neuroradiology", "Pediatric Radiology"],
  dentists: ["General Dentistry", "Orthodontics", "Pediatric Dentistry", "Oral Surgery", "Periodontics"],
}

export default function AddStaffPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")
  const [staffType, setStaffType] = useState(typeParam || "doctors")
  const [department, setDepartment] = useState("")

  const getStaffTypeLabel = (id: string) => {
    const type = staffTypes.find((t) => t.id === id)
    return type ? type.label : "Staff Member"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/staff">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New {getStaffTypeLabel(staffType)}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
          <CardDescription>Enter the new staff member's details</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="staff-type">Staff Type</Label>
              <Select
                value={staffType}
                onValueChange={(value) => {
                  setStaffType(value)
                  // Reset department if changing staff type
                  setDepartment("")
                }}
              >
                <SelectTrigger id="staff-type">
                  <SelectValue placeholder="Select staff type" />
                </SelectTrigger>
                <SelectContent>
                  {staffTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties[staffType as keyof typeof specialties]?.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase().replace(/\s+/g, "-")}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input id="employee-id" placeholder="Enter employee ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-date">Join Date</Label>
                <Input id="join-date" type="date" />
              </div>
            </div>

            {/* Additional fields based on staff type */}
            {staffType === "doctors" && (
              <div className="space-y-2">
                <Label htmlFor="license-number">Medical License Number</Label>
                <Input id="license-number" placeholder="Enter medical license number" />
              </div>
            )}

            {staffType === "nurses" && (
              <div className="space-y-2">
                <Label htmlFor="nursing-license">Nursing License Number</Label>
                <Input id="nursing-license" placeholder="Enter nursing license number" />
              </div>
            )}

            {staffType === "pharmacists" && (
              <div className="space-y-2">
                <Label htmlFor="pharmacy-license">Pharmacy License Number</Label>
                <Input id="pharmacy-license" placeholder="Enter pharmacy license number" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea id="qualifications" placeholder="Enter qualifications and certifications" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Emergency Contact</Label>
              <Input id="emergency-contact" placeholder="Enter emergency contact" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes" className="min-h-[100px]" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Add Staff Member</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
