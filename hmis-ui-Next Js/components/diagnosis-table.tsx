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
import { CheckCircle2, Clock, MoreHorizontal, Activity } from "lucide-react"
import Link from "next/link"

// Mock data for diagnoses
const diagnosisData = {
  all: [
    {
      id: "D-1001",
      patientName: "Emma Johnson",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1001",
      diagnosisName: "Hypertension",
      category: "Cardiovascular",
      diagnosedBy: "Dr. Sarah Miller",
      diagnosisDate: "2023-05-12",
      status: "Active",
      severity: "Moderate",
      notes: "Patient has a family history of hypertension. Currently on medication.",
    },
    {
      id: "D-1002",
      patientName: "Michael Chen",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1002",
      diagnosisName: "Type 2 Diabetes",
      category: "Endocrine",
      diagnosedBy: "Dr. James Wilson",
      diagnosisDate: "2023-04-18",
      status: "Chronic",
      severity: "Moderate",
      notes: "Patient needs regular monitoring of blood glucose levels.",
    },
    {
      id: "D-1003",
      patientName: "Sophia Williams",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1003",
      diagnosisName: "Acute Bronchitis",
      category: "Respiratory",
      diagnosedBy: "Dr. Emily Rodriguez",
      diagnosisDate: "2023-06-05",
      status: "Resolved",
      severity: "Mild",
      notes: "Patient has recovered after a course of antibiotics.",
    },
    {
      id: "D-1004",
      patientName: "Robert Garcia",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1004",
      diagnosisName: "Coronary Artery Disease",
      category: "Cardiovascular",
      diagnosedBy: "Dr. Sarah Miller",
      diagnosisDate: "2023-03-22",
      status: "Chronic",
      severity: "Severe",
      notes: "Patient has a history of heart attacks. On multiple medications.",
    },
    {
      id: "D-1005",
      patientName: "Olivia Brown",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1005",
      diagnosisName: "Tonsillitis",
      category: "ENT",
      diagnosedBy: "Dr. David Kim",
      diagnosisDate: "2023-06-10",
      status: "Active",
      severity: "Moderate",
      notes: "Patient is on antibiotics. Follow-up scheduled in one week.",
    },
    {
      id: "D-1006",
      patientName: "William Taylor",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1006",
      diagnosisName: "Anxiety Disorder",
      category: "Psychiatric",
      diagnosedBy: "Dr. Lisa Johnson",
      diagnosisDate: "2023-05-05",
      status: "Chronic",
      severity: "Moderate",
      notes: "Patient is on medication and attending therapy sessions.",
    },
    {
      id: "D-1007",
      patientName: "Ava Martinez",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      patientId: "P-1007",
      diagnosisName: "Appendicitis",
      category: "Gastrointestinal",
      diagnosedBy: "Dr. Michael Brown",
      diagnosisDate: "2023-06-02",
      status: "Resolved",
      severity: "Severe",
      notes: "Patient underwent appendectomy. Recovery is going well.",
    },
  ],
}

// Filter diagnoses based on status
diagnosisData.active = diagnosisData.all.filter((diagnosis) => diagnosis.status === "Active")
diagnosisData.resolved = diagnosisData.all.filter((diagnosis) => diagnosis.status === "Resolved")
diagnosisData.chronic = diagnosisData.all.filter((diagnosis) => diagnosis.status === "Chronic")

interface DiagnosisTableProps {
  status: "all" | "active" | "resolved" | "chronic"
}

export function DiagnosisTable({ status }: DiagnosisTableProps) {
  const [diagnoses, setDiagnoses] = useState(diagnosisData[status])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Activity className="h-3 w-3" />
      case "Chronic":
        return <Clock className="h-3 w-3" />
      case "Resolved":
        return <CheckCircle2 className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Chronic":
        return "outline"
      case "Resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "Mild":
        return "outline"
      case "Moderate":
        return "default"
      case "Severe":
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
            <TableHead>Diagnosis</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Diagnosed By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diagnoses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No diagnoses found
              </TableCell>
            </TableRow>
          ) : (
            diagnoses.map((diagnosis) => (
              <TableRow key={diagnosis.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={diagnosis.patientAvatar || "/placeholder.svg"} alt={diagnosis.patientName} />
                      <AvatarFallback>{diagnosis.patientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{diagnosis.patientName}</div>
                      <div className="text-xs text-muted-foreground">ID: {diagnosis.patientId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{diagnosis.diagnosisName}</TableCell>
                <TableCell>{diagnosis.category}</TableCell>
                <TableCell>{diagnosis.diagnosedBy}</TableCell>
                <TableCell>{diagnosis.diagnosisDate}</TableCell>
                <TableCell>
                  <Badge variant={getSeverityVariant(diagnosis.severity)}>{diagnosis.severity}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(diagnosis.status)} className="flex w-fit items-center gap-1">
                    {getStatusIcon(diagnosis.status)}
                    {diagnosis.status}
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
                        <Link href={`/diagnosis/${diagnosis.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/diagnosis/edit/${diagnosis.id}`}>Edit Diagnosis</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Add Treatment Plan</DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/patients/${diagnosis.patientId}`}>View Patient</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Diagnosis</DropdownMenuItem>
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
