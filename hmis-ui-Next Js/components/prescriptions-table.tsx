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
import { CheckCircle2, Clock, MoreHorizontal, RefreshCw } from "lucide-react"
import Link from "next/link"

// Mock data for prescriptions
const prescriptionsData = {
  all: [
    {
      id: "RX-1001",
      patientName: "Emma Johnson",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1001",
      medication: "Lisinopril 10mg",
      category: "Antihypertensive",
      prescribedBy: "Dr. Sarah Miller",
      prescriptionDate: "2023-06-15",
      expiryDate: "2023-09-15",
      status: "Active",
      refills: "2 remaining",
      dosage: "1 tablet daily",
      instructions: "Take with water in the morning",
    },
    {
      id: "RX-1002",
      patientName: "Michael Chen",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1002",
      medication: "Metformin 500mg",
      category: "Antidiabetic",
      prescribedBy: "Dr. James Wilson",
      prescriptionDate: "2023-06-10",
      expiryDate: "2023-09-10",
      status: "Active",
      refills: "3 remaining",
      dosage: "1 tablet twice daily",
      instructions: "Take with meals",
    },
    {
      id: "RX-1003",
      patientName: "Sophia Williams",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1003",
      medication: "Amoxicillin 500mg",
      category: "Antibiotic",
      prescribedBy: "Dr. Emily Rodriguez",
      prescriptionDate: "2023-06-05",
      expiryDate: "2023-06-12",
      status: "Completed",
      refills: "0 remaining",
      dosage: "1 capsule three times daily",
      instructions: "Take until course is complete",
    },
    {
      id: "RX-1004",
      patientName: "Robert Garcia",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1004",
      medication: "Atorvastatin 20mg",
      category: "Statin",
      prescribedBy: "Dr. Sarah Miller",
      prescriptionDate: "2023-06-12",
      expiryDate: "2023-09-12",
      status: "Active",
      refills: "0 remaining",
      dosage: "1 tablet daily",
      instructions: "Take in the evening",
    },
    {
      id: "RX-1005",
      patientName: "Olivia Brown",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1005",
      medication: "Ibuprofen 400mg",
      category: "Analgesic",
      prescribedBy: "Dr. David Kim",
      prescriptionDate: "2023-06-08",
      expiryDate: "2023-06-15",
      status: "Completed",
      refills: "0 remaining",
      dosage: "1 tablet every 6 hours as needed",
      instructions: "Take with food for pain relief",
    },
    {
      id: "RX-1006",
      patientName: "William Taylor",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1006",
      medication: "Sertraline 50mg",
      category: "Antidepressant",
      prescribedBy: "Dr. Lisa Johnson",
      prescriptionDate: "2023-06-01",
      expiryDate: "2023-08-30",
      status: "Needs Refill",
      refills: "0 remaining",
      dosage: "1 tablet daily",
      instructions: "Take in the morning",
    },
    {
      id: "RX-1007",
      patientName: "Ava Martinez",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1007",
      medication: "Levothyroxine 75mcg",
      category: "Thyroid Hormone",
      prescribedBy: "Dr. Michael Brown",
      prescriptionDate: "2023-05-20",
      expiryDate: "2023-08-20",
      status: "Needs Refill",
      refills: "0 remaining",
      dosage: "1 tablet daily",
      instructions: "Take on empty stomach 30 minutes before breakfast",
    },
  ],
}

// Filter prescriptions based on status
prescriptionsData.active = prescriptionsData.all.filter((prescription) => prescription.status === "Active")
prescriptionsData.completed = prescriptionsData.all.filter((prescription) => prescription.status === "Completed")
prescriptionsData.refill = prescriptionsData.all.filter((prescription) => prescription.status === "Needs Refill")

interface PrescriptionsTableProps {
  status: "all" | "active" | "completed" | "refill"
}

export function PrescriptionsTable({ status }: PrescriptionsTableProps) {
  const [prescriptions, setPrescriptions] = useState(prescriptionsData[status])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Clock className="h-3 w-3" />
      case "Completed":
        return <CheckCircle2 className="h-3 w-3" />
      case "Needs Refill":
        return <RefreshCw className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "Needs Refill":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Prescribed By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Refills</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No prescriptions found
              </TableCell>
            </TableRow>
          ) : (
            prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={prescription.patientAvatar || "/placeholder.svg"}
                        alt={prescription.patientName}
                      />
                      <AvatarFallback>{prescription.patientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{prescription.patientName}</div>
                      <div className="text-xs text-muted-foreground">ID: {prescription.patientId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.category}</TableCell>
                <TableCell>{prescription.prescribedBy}</TableCell>
                <TableCell>{prescription.prescriptionDate}</TableCell>
                <TableCell>{prescription.expiryDate}</TableCell>
                <TableCell>{prescription.refills}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(prescription.status)} className="flex w-fit items-center gap-1">
                    {getStatusIcon(prescription.status)}
                    {prescription.status}
                  </Badge>
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
                        <Link href={`/prescriptions/${prescription.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/prescriptions/edit/${prescription.id}`}>Edit Prescription</Link>
                      </DropdownMenuItem>
                      {prescription.status === "Needs Refill" && (
                        <DropdownMenuItem>Refill Prescription</DropdownMenuItem>
                      )}
                      <DropdownMenuItem>Print Prescription</DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/patients/${prescription.patientId}`}>View Patient</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancel Prescription</DropdownMenuItem>
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
