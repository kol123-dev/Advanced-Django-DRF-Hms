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
import { CheckCircle2, MoreHorizontal, AlertCircle, Paperclip } from "lucide-react"
import Link from "next/link"

// Mock data for emails
const emailsData = [
  {
    id: "EMAIL-1001",
    sender: "Dr. Sarah Miller",
    senderEmail: "sarah.miller@hospital.com",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "james.wilson@hospital.com",
    subject: "Patient Referral - Emma Johnson",
    message: "I'm referring Emma Johnson to you for a cardiology consultation. Her medical records are attached.",
    category: "Patient",
    date: "2023-07-15 10:30 AM",
    status: "Unread",
    hasAttachment: true,
  },
  {
    id: "EMAIL-1002",
    sender: "Hospital Administration",
    senderEmail: "admin@hospital.com",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "all-staff@hospital.com",
    subject: "Monthly Staff Meeting - Agenda",
    message: "Please find attached the agenda for our monthly staff meeting scheduled for next week.",
    category: "Administrative",
    date: "2023-07-15 09:15 AM",
    status: "Read",
    hasAttachment: true,
  },
  {
    id: "EMAIL-1003",
    sender: "Medical Supplies Inc.",
    senderEmail: "orders@medicalsupplies.com",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "procurement@hospital.com",
    subject: "Order Confirmation #12345",
    message: "This is to confirm that your order #12345 has been processed and will be shipped within 2 business days.",
    category: "Supplies",
    date: "2023-07-14 03:45 PM",
    status: "Read",
    hasAttachment: false,
  },
  {
    id: "EMAIL-1004",
    sender: "Dr. Emily Rodriguez",
    senderEmail: "emily.rodriguez@hospital.com",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "sarah.miller@hospital.com",
    subject: "Research Collaboration Opportunity",
    message:
      "I'd like to discuss a potential research collaboration on hypertension management. Are you available for a meeting next week?",
    category: "Research",
    date: "2023-07-14 01:30 PM",
    status: "Unread",
    hasAttachment: false,
  },
  {
    id: "EMAIL-1005",
    sender: "Healthcare Conference",
    senderEmail: "info@healthcareconference.org",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    recipient: "doctors@hospital.com",
    subject: "Invitation to Speak at Annual Conference",
    message: "We would like to invite you to be a speaker at our annual healthcare conference. Details are attached.",
    category: "Event",
    date: "2023-07-13 11:20 AM",
    status: "Read",
    hasAttachment: true,
  },
]

export function EmailsTable() {
  const [emails, setEmails] = useState(emailsData)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No emails found
              </TableCell>
            </TableRow>
          ) : (
            emails.map((email) => (
              <TableRow key={email.id} className={email.status === "Unread" ? "bg-muted/30" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={email.senderAvatar || "/placeholder.svg"} alt={email.sender} />
                      <AvatarFallback>{email.sender.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{email.sender}</div>
                      <div className="text-xs text-muted-foreground">{email.senderEmail}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {email.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                    <div>
                      <div className="font-medium">{email.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{email.message}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{email.category}</TableCell>
                <TableCell>{email.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={email.status === "Unread" ? "default" : "outline"}
                    className="flex w-fit items-center gap-1"
                  >
                    {email.status === "Unread" ? (
                      <AlertCircle className="h-3 w-3" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {email.status}
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
                        <Link href={`/communication/emails/${email.id}`}>View Email</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Reply</DropdownMenuItem>
                      <DropdownMenuItem>Forward</DropdownMenuItem>
                      {email.status === "Unread" && <DropdownMenuItem>Mark as Read</DropdownMenuItem>}
                      {email.status === "Read" && <DropdownMenuItem>Mark as Unread</DropdownMenuItem>}
                      {email.hasAttachment && <DropdownMenuItem>Download Attachment</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Email</DropdownMenuItem>
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
