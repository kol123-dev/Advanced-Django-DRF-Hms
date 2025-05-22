import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface MedicalRecord {
  id: string
  patientName: string
  patientAvatar: string
  doctorName: string
  department: string
  date: string
  diagnosis: string
  recordType: "Consultation" | "Lab Result" | "Surgery" | "Prescription"
}

const medicalRecords: MedicalRecord[] = [
  {
    id: "MR-1001",
    patientName: "Emma Johnson",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    date: "2023-05-12",
    diagnosis: "Hypertension",
    recordType: "Consultation",
  },
  {
    id: "MR-1002",
    patientName: "Michael Chen",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. James Wilson",
    department: "Orthopedics",
    date: "2023-05-15",
    diagnosis: "Fractured Radius",
    recordType: "Surgery",
  },
  {
    id: "MR-1003",
    patientName: "Sophia Williams",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Emily Rodriguez",
    department: "Obstetrics",
    date: "2023-05-10",
    diagnosis: "Routine Pregnancy Checkup",
    recordType: "Consultation",
  },
  {
    id: "MR-1004",
    patientName: "Robert Garcia",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    date: "2023-05-08",
    diagnosis: "Coronary Artery Disease",
    recordType: "Lab Result",
  },
  {
    id: "MR-1005",
    patientName: "Olivia Brown",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. David Kim",
    department: "Pediatrics",
    date: "2023-05-05",
    diagnosis: "Tonsillitis",
    recordType: "Prescription",
  },
  {
    id: "MR-1006",
    patientName: "William Taylor",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Lisa Johnson",
    department: "Neurology",
    date: "2023-05-14",
    diagnosis: "Migraine",
    recordType: "Prescription",
  },
  {
    id: "MR-1007",
    patientName: "Ava Martinez",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Michael Brown",
    department: "Surgery",
    date: "2023-05-01",
    diagnosis: "Appendicitis",
    recordType: "Surgery",
  },
]

export default function MedicalRecordsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
        <Link href="/medical-records/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Medical Records Management</CardTitle>
          <CardDescription>View and manage all patient medical records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search records..." className="w-full pl-8 bg-background" />
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Record Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={record.patientAvatar || "/placeholder.svg"} alt={record.patientName} />
                            <AvatarFallback>{record.patientName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{record.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{record.doctorName}</div>
                          <div className="text-xs text-muted-foreground">{record.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.recordType === "Consultation"
                              ? "outline"
                              : record.recordType === "Surgery"
                                ? "destructive"
                                : record.recordType === "Lab Result"
                                  ? "secondary"
                                  : "default"
                          }
                        >
                          {record.recordType}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuItem>Print Record</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Record</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
