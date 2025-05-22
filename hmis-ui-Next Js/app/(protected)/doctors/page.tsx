import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

interface Doctor {
  id: string
  name: string
  specialty: string
  department: string
  phone: string
  email: string
  status: "Available" | "On Leave" | "In Surgery"
  patients: number
  avatar: string
}

const doctors: Doctor[] = [
  {
    id: "D-1001",
    name: "Dr. Sarah Miller",
    specialty: "Cardiologist",
    department: "Cardiology",
    phone: "(555) 123-4567",
    email: "sarah.miller@hospital.com",
    status: "Available",
    patients: 24,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1002",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    phone: "(555) 987-6543",
    email: "james.wilson@hospital.com",
    status: "In Surgery",
    patients: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1003",
    name: "Dr. Emily Rodriguez",
    specialty: "Obstetrician",
    department: "Obstetrics",
    phone: "(555) 456-7890",
    email: "emily.rodriguez@hospital.com",
    status: "Available",
    patients: 32,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1004",
    name: "Dr. David Kim",
    specialty: "Pediatrician",
    department: "Pediatrics",
    phone: "(555) 234-5678",
    email: "david.kim@hospital.com",
    status: "On Leave",
    patients: 45,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1005",
    name: "Dr. Lisa Johnson",
    specialty: "Neurologist",
    department: "Neurology",
    phone: "(555) 876-5432",
    email: "lisa.johnson@hospital.com",
    status: "Available",
    patients: 15,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1006",
    name: "Dr. Michael Brown",
    specialty: "General Surgeon",
    department: "Surgery",
    phone: "(555) 345-6789",
    email: "michael.brown@hospital.com",
    status: "In Surgery",
    patients: 22,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
        <Link href="/doctors/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Doctor Management</CardTitle>
          <CardDescription>View and manage all doctor records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search doctors..." className="w-full pl-8 bg-background" />
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
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Patients</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{doctor.name}</div>
                            <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doctor.department}</TableCell>
                      <TableCell>
                        <div className="text-sm">{doctor.phone}</div>
                        <div className="text-xs text-muted-foreground">{doctor.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            doctor.status === "Available"
                              ? "default"
                              : doctor.status === "In Surgery"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {doctor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{doctor.patients}</TableCell>
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
                            <DropdownMenuItem>Edit Doctor</DropdownMenuItem>
                            <DropdownMenuItem>View Schedule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove Doctor</DropdownMenuItem>
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
