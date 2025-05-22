"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This would normally come from a database
const getStaffMember = (id: string) => {
  // For demo purposes, return a mock staff member
  return {
    id: id,
    firstName: "Sarah",
    lastName: "Miller",
    type: "doctors",
    specialty: "Cardiologist",
    department: "Cardiology",
    phone: "(555) 123-4567",
    email: "sarah.miller@hospital.com",
    address: "123 Medical Plaza, Suite 456, Healthcare City",
    status: "Active",
    joinDate: "2018-05-15",
    licenseNumber: "MED-2018-45678",
    qualifications:
      "Doctor of Medicine, University Medical School, 2010\nResidency in Internal Medicine, City Hospital, 2013\nFellowship in Cardiology, Heart Institute, 2016\nBoard Certified in Cardiology, 2016",
    bio: "Dr. Sarah Miller is a board-certified cardiologist with over 10 years of experience in diagnosing and treating heart conditions. She specializes in interventional cardiology and has performed over 500 cardiac catheterizations.",
    emergencyContact: "John Miller, (555) 987-6543, Spouse",
    avatar: "/placeholder.svg?height=128&width=128",
  }
}

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

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const staffData = getStaffMember(params.id)
  const [staff, setStaff] = useState(staffData)

  const handleChange = (field: string, value: string) => {
    setStaff({ ...staff, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the data to a database here
    console.log("Updated staff data:", staff)
    // Redirect to staff details page
    window.location.href = `/staff/${params.id}`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href={`/staff/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit Staff Member</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
          <CardDescription>Update staff member details</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="edit-staff-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={`${staff.firstName} ${staff.lastName}`} />
                <AvatarFallback>{`${staff.firstName.charAt(0)}${staff.lastName.charAt(0)}`}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="avatar">Profile Photo</Label>
                <Input id="avatar" type="file" />
                <p className="text-sm text-muted-foreground">Upload a new profile photo (max 2MB)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="staff-type">Staff Type</Label>
              <Select value={staff.type} onValueChange={(value) => handleChange("type", value)}>
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
                <Input
                  id="first-name"
                  value={staff.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  value={staff.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={staff.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={staff.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={staff.department.toLowerCase()}
                  onValueChange={(value) => handleChange("department", value)}
                >
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
                <Input
                  id="specialty"
                  value={staff.specialty}
                  onChange={(e) => handleChange("specialty", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input
                  id="license-number"
                  value={staff.licenseNumber}
                  onChange={(e) => handleChange("licenseNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="join-date">Join Date</Label>
                <Input
                  id="join-date"
                  type="date"
                  value={staff.joinDate}
                  onChange={(e) => handleChange("joinDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={staff.status.toLowerCase()} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                value={staff.qualifications}
                onChange={(e) => handleChange("qualifications", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={staff.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={staff.address} onChange={(e) => handleChange("address", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Emergency Contact</Label>
              <Input
                id="emergency-contact"
                value={staff.emergencyContact}
                onChange={(e) => handleChange("emergencyContact", e.target.value)}
                placeholder="Name, Phone, Relationship"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/staff/${params.id}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" form="edit-staff-form">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
