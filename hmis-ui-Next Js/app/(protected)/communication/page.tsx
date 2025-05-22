import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, MessageSquare, Plus, Search } from "lucide-react"
import Link from "next/link"
import { CommunicationStatsCards } from "@/components/communication-stats-cards"
import { MessagesTable } from "@/components/messages-table"
import { EmailsTable } from "@/components/emails-table"
import { NotificationsTable } from "@/components/notifications-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CommunicationPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Communication Management</h1>
        <Link href="/communication/compose">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </Link>
      </div>

      <CommunicationStatsCards />

      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
          <CardDescription>Manage all hospital communications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search communications..." className="w-full pl-8 bg-background" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="messages">
              <MessagesTable />
            </TabsContent>
            <TabsContent value="emails">
              <EmailsTable />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Your most recent message threads</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConversations.map((conversation, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                    <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{conversation.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Contacts</CardTitle>
            <CardDescription>Frequently contacted staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent conversations
const recentConversations = [
  {
    name: "Dr. Sarah Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Patient Emma Johnson's blood pressure readings are concerning. Can we discuss her treatment plan?",
    time: "10 min ago",
  },
  {
    name: "Nurse Robert Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "The lab results for Michael Chen are ready. I've uploaded them to his medical record.",
    time: "25 min ago",
  },
  {
    name: "Dr. James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I'll be running late for the staff meeting today. Can you cover for me until I arrive?",
    time: "1 hour ago",
  },
  {
    name: "Admin Lisa Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Reminder: The new hospital policy on medication administration takes effect next week.",
    time: "2 hours ago",
  },
]

// Mock data for quick contacts
const quickContacts = [
  {
    name: "Dr. Sarah Miller",
    role: "Cardiologist",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Dr. James Wilson",
    role: "Orthopedic Surgeon",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Nurse Robert Brown",
    role: "Head Nurse",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Obstetrician",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Admin Lisa Johnson",
    role: "Hospital Administrator",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]
