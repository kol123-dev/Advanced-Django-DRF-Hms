"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data for different staff types
const staffData = {
  doctors: [
    {
      id: "D-1001",
      name: "Dr. Sarah Miller",
      specialty: "Cardiologist",
      department: "Cardiology",
      phone: "(555) 123-4567",
      email: "sarah.miller@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1002",
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      department: "Orthopedics",
      phone: "(555) 987-6543",
      email: "james.wilson@hospital.com",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1003",
      name: "Dr. Emily Rodriguez",
      specialty: "Obstetrician",
      department: "Obstetrics",
      phone: "(555) 456-7890",
      email: "emily.rodriguez@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1004",
      name: "Dr. David Kim",
      specialty: "Pediatrician",
      department: "Pediatrics",
      phone: "(555) 234-5678",
      email: "david.kim@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "D-1005",
      name: "Dr. Lisa Johnson",
      specialty: "Neurologist",
      department: "Neurology",
      phone: "(555) 876-5432",
      email: "lisa.johnson@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  nurses: [
    {
      id: "N-1001",
      name: "Nancy Williams",
      specialty: "Registered Nurse",
      department: "Emergency",
      phone: "(555) 111-2222",
      email: "nancy.williams@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "N-1002",
      name: "Robert Brown",
      specialty: "Nurse Practitioner",
      department: "Cardiology",
      phone: "(555) 333-4444",
      email: "robert.brown@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "N-1003",
      name: "Maria Garcia",
      specialty: "Pediatric Nurse",
      department: "Pediatrics",
      phone: "(555) 555-6666",
      email: "maria.garcia@hospital.com",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "N-1004",
      name: "John Smith",
      specialty: "ICU Nurse",
      department: "Intensive Care",
      phone: "(555) 777-8888",
      email: "john.smith@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "N-1005",
      name: "Linda Martinez",
      specialty: "Surgical Nurse",
      department: "Surgery",
      phone: "(555) 999-0000",
      email: "linda.martinez@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  receptionists: [
    {
      id: "R-1001",
      name: "Jennifer Lee",
      specialty: "Front Desk",
      department: "Administration",
      phone: "(555) 123-9876",
      email: "jennifer.lee@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "R-1002",
      name: "Michael Taylor",
      specialty: "Patient Registration",
      department: "Administration",
      phone: "(555) 456-7890",
      email: "michael.taylor@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "R-1003",
      name: "Susan Anderson",
      specialty: "Appointment Scheduling",
      department: "Administration",
      phone: "(555) 789-0123",
      email: "susan.anderson@hospital.com",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "clinical-officers": [
    {
      id: "CO-1001",
      name: "Thomas Johnson",
      specialty: "General Practice",
      department: "Outpatient",
      phone: "(555) 222-3333",
      email: "thomas.johnson@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "CO-1002",
      name: "Patricia Davis",
      specialty: "Pediatrics",
      department: "Pediatrics",
      phone: "(555) 444-5555",
      email: "patricia.davis@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "CO-1003",
      name: "Richard Wilson",
      specialty: "Emergency Care",
      department: "Emergency",
      phone: "(555) 666-7777",
      email: "richard.wilson@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "lab-technicians": [
    {
      id: "LT-1001",
      name: "Karen White",
      specialty: "Hematology",
      department: "Laboratory",
      phone: "(555) 111-3333",
      email: "karen.white@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "LT-1002",
      name: "Daniel Martin",
      specialty: "Microbiology",
      department: "Laboratory",
      phone: "(555) 222-4444",
      email: "daniel.martin@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "LT-1003",
      name: "Elizabeth Thompson",
      specialty: "Biochemistry",
      department: "Laboratory",
      phone: "(555) 333-5555",
      email: "elizabeth.thompson@hospital.com",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  pharmacists: [
    {
      id: "P-1001",
      name: "Christopher Clark",
      specialty: "Clinical Pharmacist",
      department: "Pharmacy",
      phone: "(555) 444-6666",
      email: "christopher.clark@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1002",
      name: "Amanda Lewis",
      specialty: "Oncology Pharmacist",
      department: "Pharmacy",
      phone: "(555) 555-7777",
      email: "amanda.lewis@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P-1003",
      name: "Brian Walker",
      specialty: "Pediatric Pharmacist",
      department: "Pharmacy",
      phone: "(555) 666-8888",
      email: "brian.walker@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  radiologists: [
    {
      id: "RA-1001",
      name: "Jessica Hall",
      specialty: "Diagnostic Radiology",
      department: "Radiology",
      phone: "(555) 777-9999",
      email: "jessica.hall@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "RA-1002",
      name: "Kevin Young",
      specialty: "Interventional Radiology",
      department: "Radiology",
      phone: "(555) 888-0000",
      email: "kevin.young@hospital.com",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "RA-1003",
      name: "Melissa Allen",
      specialty: "Neuroradiology",
      department: "Radiology",
      phone: "(555) 999-1111",
      email: "melissa.allen@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  dentists: [
    {
      id: "DE-1001",
      name: "Andrew Scott",
      specialty: "General Dentistry",
      department: "Dental",
      phone: "(555) 123-7890",
      email: "andrew.scott@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "DE-1002",
      name: "Olivia Green",
      specialty: "Orthodontics",
      department: "Dental",
      phone: "(555) 456-1230",
      email: "olivia.green@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "DE-1003",
      name: "William Baker",
      specialty: "Pediatric Dentistry",
      department: "Dental",
      phone: "(555) 789-4560",
      email: "william.baker@hospital.com",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
}

interface StaffTableProps {
  staffType: string
}

export function StaffTable({ staffType }: StaffTableProps) {
  const [staff, setStaff] = useState(staffData[staffType as keyof typeof staffData] || [])

  const handleDelete = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No staff members found
              </TableCell>
            </TableRow>
          ) : (
            staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {member.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.specialty}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>
                  <div className="text-sm">{member.phone}</div>
                  <div className="text-xs text-muted-foreground">{member.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={member.status === "Active" ? "default" : "outline"}>{member.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/staff/${member.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/staff/edit/${member.id}`}>Edit Staff</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(member.id)}>
                        Remove Staff
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
