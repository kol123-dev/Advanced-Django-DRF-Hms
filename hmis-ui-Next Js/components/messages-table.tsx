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
import { CheckCircle2, MoreHorizontal, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for messages
const messagesData = [
  {
    id: "MSG-1001",
    sender: "Dr. Sarah Miller",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "Dr. James Wilson",
    subject: "Patient Consultation",
    message: "Can we discuss Emma Johnson's treatment plan? Her blood pressure readings are concerning.",
    category: "Patient",
    date: "2023-07-15 10:30 AM",
    status: "Unread",
    priority: "High",
  },
  {
    id: "MSG-1002",
    sender: "Nurse Robert Brown",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "Dr. Sarah Miller",
    subject: "Lab Results",
    message: "The lab results for Michael Chen are ready. I've uploaded them to his medical record.",
    category: "Patient",
    date: "2023-07-15 09:45 AM",
    status: "Read",
    priority: "Medium",
  },
  {
    id: "MSG-1003",
    sender: "Dr. James Wilson",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "Hospital Staff",
    subject: "Staff Meeting",
    message: "I'll be running late for the staff meeting today. Can someone cover for me until I arrive?",
    category: "Administrative",
    date: "2023-07-15 08:15 AM",
    status: "Read",
    priority: "Low",
  },
  {
    id: "MSG-1004",
    sender: "Admin Lisa Johnson",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "All Doctors",
    subject: "New Hospital Policy",
    message: "Reminder: The new hospital policy on medication administration takes effect next week.",
    category: "Administrative",
    date: "2023-07-14 04:30 PM",
    status: "Read",
    priority: "Medium",
  },
  {
    id: "MSG-1005",
    sender: "Emergency Department",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "All Staff",
    subject: "Emergency Alert",
    message: "Multiple trauma patients arriving in 10 minutes. All available staff to Emergency Department.",
    category: "Emergency",
    date: "2023-07-14 02:15 PM",
    status: "Read",
    priority: "Critical",
  },
  {
    id: "MSG-1006",
    sender: "System",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "Dr. Sarah Miller",
    subject: "Appointment Reminder",
    message: "Reminder: You have an appointment with patient Sophia Williams tomorrow at 10:00 AM.",
    category: "Appointment",
    date: "2023-07-14 01:00 PM",
    status: "Unread",
    priority: "Medium",
  },
]

export function MessagesTable() {
  const [messages, setMessages] = useState(messagesData)

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusVariant = (status: string) => {
    return status === "Unread" ? "default" : "outline"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No messages found
              </TableCell>
            </TableRow>
          ) : (
            messages.map((message) => (
              <TableRow key={message.id} className={message.status === "Unread" ? "bg-muted/30" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.sender} />
                      <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{message.sender}</div>
                      <div className="text-xs text-muted-foreground">To: {message.recipient}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{message.subject}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{message.message}</div>
                </TableCell>
                <TableCell>{message.category}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(message.priority)}>{message.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(message.status)} className="flex w-fit items-center gap-1">
                    {message.status === "Unread" ? (
                      <AlertCircle className="h-3 w-3" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {message.status}
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
                        <Link href={`/communication/messages/${message.id}`}>View Message</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Reply</DropdownMenuItem>
                      <DropdownMenuItem>Forward</DropdownMenuItem>
                      {message.status === "Unread" && <DropdownMenuItem>Mark as Read</DropdownMenuItem>}
                      {message.status === "Read" && <DropdownMenuItem>Mark as Unread</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Message</DropdownMenuItem>
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
