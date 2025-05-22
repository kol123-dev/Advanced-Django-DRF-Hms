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
import { CheckCircle2, Clock, MoreHorizontal, Hourglass } from "lucide-react"
import Link from "next/link"

// Mock data for lab tests
const labTestsData = {
  all: [
    {
      id: "LT-1001",
      patientName: "Emma Johnson",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Complete Blood Count (CBC)",
      category: "Hematology",
      requestedBy: "Dr. Sarah Miller",
      requestDate: "2023-07-15",
      status: "Completed",
      priority: "Routine",
      result: "Normal",
    },
    {
      id: "LT-1002",
      patientName: "Michael Chen",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Liver Function Test",
      category: "Biochemistry",
      requestedBy: "Dr. James Wilson",
      requestDate: "2023-07-16",
      status: "In Progress",
      priority: "Urgent",
      result: "Pending",
    },
    {
      id: "LT-1003",
      patientName: "Sophia Williams",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Urinalysis",
      category: "Microbiology",
      requestedBy: "Dr. Emily Rodriguez",
      requestDate: "2023-07-16",
      status: "Pending",
      priority: "Routine",
      result: "Pending",
    },
    {
      id: "LT-1004",
      patientName: "Robert Garcia",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Lipid Profile",
      category: "Biochemistry",
      requestedBy: "Dr. Sarah Miller",
      requestDate: "2023-07-14",
      status: "Completed",
      priority: "Routine",
      result: "Abnormal",
    },
    {
      id: "LT-1005",
      patientName: "Olivia Brown",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Blood Culture",
      category: "Microbiology",
      requestedBy: "Dr. David Kim",
      requestDate: "2023-07-15",
      status: "In Progress",
      priority: "STAT",
      result: "Pending",
    },
    {
      id: "LT-1006",
      patientName: "William Taylor",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "Thyroid Function Test",
      category: "Immunology",
      requestedBy: "Dr. Lisa Johnson",
      requestDate: "2023-07-16",
      status: "Pending",
      priority: "Urgent",
      result: "Pending",
    },
    {
      id: "LT-1007",
      patientName: "Ava Martinez",
      patientAvatar: "/placeholder.svg?height=32&width=32",
      testName: "HbA1c",
      category: "Biochemistry",
      requestedBy: "Dr. Michael Brown",
      requestDate: "2023-07-14",
      status: "Completed",
      priority: "Routine",
      result: "Normal",
    },
  ],
}

// Filter tests based on status
labTestsData.pending = labTestsData.all.filter((test) => test.status === "Pending")
labTestsData["in-progress"] = labTestsData.all.filter((test) => test.status === "In Progress")
labTestsData.completed = labTestsData.all.filter((test) => test.status === "Completed")

interface LabTestsTableProps {
  status: "all" | "pending" | "in-progress" | "completed"
}

export function LabTestsTable({ status }: LabTestsTableProps) {
  const [tests, setTests] = useState(labTestsData[status])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-3 w-3" />
      case "In Progress":
        return <Hourglass className="h-3 w-3" />
      case "Completed":
        return <CheckCircle2 className="h-3 w-3" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "outline"
      case "In Progress":
        return "default"
      case "Completed":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "STAT":
        return "destructive"
      case "Urgent":
        return "default"
      case "Routine":
        return "outline"
      default:
        return "outline"
    }
  }

  const getResultVariant = (result: string) => {
    switch (result) {
      case "Normal":
        return "outline"
      case "Abnormal":
        return "destructive"
      case "Pending":
        return "secondary"
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
            <TableHead>Test</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No lab tests found
              </TableCell>
            </TableRow>
          ) : (
            tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={test.patientAvatar || "/placeholder.svg"} alt={test.patientName} />
                      <AvatarFallback>{test.patientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{test.patientName}</div>
                      <div className="text-xs text-muted-foreground">ID: {test.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>{test.category}</TableCell>
                <TableCell>{test.requestedBy}</TableCell>
                <TableCell>{test.requestDate}</TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(test.priority)}>{test.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(test.status)} className="flex w-fit items-center gap-1">
                    {getStatusIcon(test.status)}
                    {test.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getResultVariant(test.result)}>{test.result}</Badge>
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
                        <Link href={`/lab/tests/${test.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      {test.status === "Pending" && <DropdownMenuItem>Start Processing</DropdownMenuItem>}
                      {test.status === "In Progress" && <DropdownMenuItem>Enter Results</DropdownMenuItem>}
                      {test.status === "Completed" && <DropdownMenuItem>Print Report</DropdownMenuItem>}
                      <DropdownMenuItem>View Patient</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancel Test</DropdownMenuItem>
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
