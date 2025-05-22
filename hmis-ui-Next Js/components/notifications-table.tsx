"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { AlertCircle, Bell, Calendar, CheckCircle2, MoreHorizontal, User } from "lucide-react"
import Link from "next/link"

// Mock data for notifications
const notificationsData = [
  {
    id: "NOTIF-1001",
    title: "Appointment Reminder",
    message: "You have an appointment with patient Emma Johnson tomorrow at 10:00 AM.",
    type: "Appointment",
    date: "2023-07-15 10:30 AM",
    status: "Unread",
    icon: Calendar,
  },
  {
    id: "NOTIF-1002",
    title: "New Lab Results",
    message: "Lab results for patient Michael Chen are now available.",
    type: "Patient",
    date: "2023-07-15 09:15 AM",
    status: "Read",
    icon: User,
  },
  {
    id: "NOTIF-1003",
    title: "Staff Meeting",
    message: "Reminder: Monthly staff meeting today at 2:00 PM in Conference Room A.",
    type: "Administrative",
    date: "2023-07-15 08:00 AM",
    status: "Unread",
    icon: Bell,
  },
  {
    id: "NOTIF-1004",
    title: "System Maintenance",
    message: "The electronic health record system will be down for maintenance tonight from 2:00 AM to 4:00 AM.",
    type: "System",
    date: "2023-07-14 04:30 PM",
    status: "Read",
    icon: AlertCircle,
  },
  {
    id: "NOTIF-1005",
    title: "Medication Alert",
    message: "Pharmacy is running low on Lisinopril 10mg. Please consider alternatives when prescribing.",
    type: "Pharmacy",
    date: "2023-07-14 02:15 PM",
    status: "Read",
    icon: AlertCircle,
  },
]

export function NotificationsTable() {
  const [notifications, setNotifications] = useState(notificationsData)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Appointment":
        return <Calendar className="h-4 w-4" />
      case "Patient":
        return <User className="h-4 w-4" />
      case "Administrative":
        return <Bell className="h-4 w-4" />
      case "System":
      case "Pharmacy":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Appointment":
        return "default"
      case "Patient":
        return "secondary"
      case "Administrative":
        return "outline"
      case "System":
        return "destructive"
      case "Pharmacy":
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
            <TableHead>Notification</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No notifications found
              </TableCell>
            </TableRow>
          ) : (
            notifications.map((notification) => (
              <TableRow key={notification.id} className={notification.status === "Unread" ? "bg-muted/30" : ""}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{notification.message}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeVariant(notification.type)}>{notification.type}</Badge>
                </TableCell>
                <TableCell>{notification.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={notification.status === "Unread" ? "default" : "outline"}
                    className="flex w-fit items-center gap-1"
                  >
                    {notification.status === "Unread" ? (
                      <AlertCircle className="h-3 w-3" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {notification.status}
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
                        <Link href={`/communication/notifications/${notification.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      {notification.status === "Unread" && <DropdownMenuItem>Mark as Read</DropdownMenuItem>}
                      {notification.status === "Read" && <DropdownMenuItem>Mark as Unread</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Dismiss</DropdownMenuItem>
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
