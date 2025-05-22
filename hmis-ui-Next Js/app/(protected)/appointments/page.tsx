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
import { CalendarIcon, CheckCircle2, Clock, Filter, MoreHorizontal, Plus, Search, XCircle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface Appointment {
  id: string
  patientName: string
  patientAvatar: string
  doctorName: string
  department: string
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled"
  type: "Checkup" | "Emergency" | "Follow-up" | "Surgery"
}

const appointments: Appointment[] = [
  {
    id: "A-1001",
    patientName: "Emma Johnson",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    date: "2023-05-18",
    time: "09:00 AM",
    status: "Scheduled",
    type: "Checkup",
  },
  {
    id: "A-1002",
    patientName: "Michael Chen",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. James Wilson",
    department: "Orthopedics",
    date: "2023-05-18",
    time: "10:30 AM",
    status: "Scheduled",
    type: "Follow-up",
  },
  {
    id: "A-1003",
    patientName: "Sophia Williams",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Emily Rodriguez",
    department: "Obstetrics",
    date: "2023-05-17",
    time: "11:15 AM",
    status: "Completed",
    type: "Checkup",
  },
  {
    id: "A-1004",
    patientName: "Robert Garcia",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Sarah Miller",
    department: "Cardiology",
    date: "2023-05-18",
    time: "01:45 PM",
    status: "Scheduled",
    type: "Follow-up",
  },
  {
    id: "A-1005",
    patientName: "Olivia Brown",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. David Kim",
    department: "Pediatrics",
    date: "2023-05-16",
    time: "03:00 PM",
    status: "Cancelled",
    type: "Checkup",
  },
  {
    id: "A-1006",
    patientName: "William Taylor",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Michael Brown",
    department: "Surgery",
    date: "2023-05-19",
    time: "08:30 AM",
    status: "Scheduled",
    type: "Surgery",
  },
  {
    id: "A-1007",
    patientName: "Ava Martinez",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    doctorName: "Dr. Lisa Johnson",
    department: "Neurology",
    date: "2023-05-17",
    time: "02:15 PM",
    status: "Completed",
    type: "Follow-up",
  },
]

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
        <Link href="/appointments/schedule">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>View and manage all appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Pick a date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
            <div className="flex w-full items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search appointments..." className="w-full pl-8 bg-background" />
              </div>
            </div>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.patientAvatar || "/placeholder.svg"}
                                alt={appointment.patientName}
                              />
                              <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{appointment.doctorName}</div>
                            <div className="text-xs text-muted-foreground">{appointment.department}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{appointment.date}</div>
                            <div className="text-xs text-muted-foreground">{appointment.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{appointment.type}</Badge>
                        </TableCell>
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
                            {appointment.status}
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
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Cancel Appointment</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="today" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments
                      .filter((a) => a.date === "2023-05-18")
                      .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={appointment.patientAvatar || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span>{appointment.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{appointment.doctorName}</div>
                              <div className="text-xs text-muted-foreground">{appointment.department}</div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{appointment.type}</Badge>
                          </TableCell>
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
                              {appointment.status}
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
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="upcoming" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments
                      .filter((a) => a.status === "Scheduled" && new Date(a.date) > new Date("2023-05-18"))
                      .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={appointment.patientAvatar || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span>{appointment.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{appointment.doctorName}</div>
                              <div className="text-xs text-muted-foreground">{appointment.department}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{appointment.date}</div>
                              <div className="text-xs text-muted-foreground">{appointment.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{appointment.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex w-fit items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.status}
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
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel Appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments
                      .filter((a) => a.status === "Completed")
                      .map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={appointment.patientAvatar || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>{appointment.patientName.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span>{appointment.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{appointment.doctorName}</div>
                              <div className="text-xs text-muted-foreground">{appointment.department}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{appointment.date}</div>
                              <div className="text-xs text-muted-foreground">{appointment.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{appointment.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="flex w-fit items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              {appointment.status}
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
                                <DropdownMenuItem>View Medical Record</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
