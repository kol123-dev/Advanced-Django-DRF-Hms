import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Appointment {
  id: string
  patientName: string
  patientAvatar: string
  doctorName: string
  department: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled"
}

const appointments: Appointment[] = [
  {
    id: "A-1001",
    patientName: "Emma Johnson",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    time: "09:00 AM",
    status: "Scheduled",
  },
  {
    id: "A-1002",
    patientName: "Michael Chen",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. James Wilson",
    department: "Orthopedics",
    time: "10:30 AM",
    status: "Scheduled",
  },
  {
    id: "A-1003",
    patientName: "Sophia Williams",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Emily Rodriguez",
    department: "Obstetrics",
    time: "11:15 AM",
    status: "Completed",
  },
  {
    id: "A-1004",
    patientName: "Robert Garcia",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    time: "01:45 PM",
    status: "Scheduled",
  },
  {
    id: "A-1005",
    patientName: "Olivia Brown",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. David Kim",
    department: "Pediatrics",
    time: "03:00 PM",
    status: "Cancelled",
  },
]

interface AppointmentListProps {
  limit?: number
}

export function AppointmentList({ limit }: AppointmentListProps) {
  const displayAppointments = limit ? appointments.slice(0, limit) : appointments

  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Patient</TableHead>
            <TableHead className="hidden md:table-cell">Doctor</TableHead>
            <TableHead className="hidden sm:table-cell">Department</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayAppointments.map((appointment) => (
            <TableRow key={appointment.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 hidden sm:flex">
                    <AvatarImage src={appointment.patientAvatar || "/placeholder.svg"} alt={appointment.patientName} />
                    <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className={cn("truncate max-w-[120px] sm:max-w-none")}>{appointment.patientName}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{appointment.doctorName}</TableCell>
              <TableCell className="hidden sm:table-cell">{appointment.department}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === "Scheduled"
                      ? "outline"
                      : appointment.status === "Completed"
                        ? "default"
                        : "destructive"
                  }
                  className="flex w-fit items-center gap-1"
                >
                  {appointment.status === "Scheduled" ? (
                    <Clock className="h-3 w-3" />
                  ) : appointment.status === "Completed" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span className="hidden sm:inline">{appointment.status}</span>
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 hover:bg-muted">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
