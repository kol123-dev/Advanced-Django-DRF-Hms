import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Mail, MapPin, Phone, Pencil } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would normally come from a database
const getStaffMember = (id: string) => {
  // For demo purposes, return a mock staff member
  return {
    id: id,
    name: "Dr. Sarah Miller",
    type: "Doctor",
    specialty: "Cardiologist",
    department: "Cardiology",
    phone: "(555) 123-4567",
    email: "sarah.miller@hospital.com",
    address: "123 Medical Plaza, Suite 456, Healthcare City",
    status: "Active",
    joinDate: "May 15, 2018",
    licenseNumber: "MED-2018-45678",
    qualifications: [
      "Doctor of Medicine, University Medical School, 2010",
      "Residency in Internal Medicine, City Hospital, 2013",
      "Fellowship in Cardiology, Heart Institute, 2016",
      "Board Certified in Cardiology, 2016",
    ],
    bio: "Dr. Sarah Miller is a board-certified cardiologist with over 10 years of experience in diagnosing and treating heart conditions. She specializes in interventional cardiology and has performed over 500 cardiac catheterizations.",
    schedule: [
      { day: "Monday", hours: "8:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 4:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "8:00 AM - 12:00 PM" },
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  }
}

export default function StaffDetailPage({ params }: { params: { id: string } }) {
  const staff = getStaffMember(params.id)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/staff">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Staff Details</h1>
        </div>
        <Link href={`/staff/edit/${params.id}`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Staff
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle>{staff.name}</CardTitle>
              <CardDescription className="flex flex-col items-center gap-1">
                <Badge className="mt-1">{staff.type}</Badge>
                <span className="text-sm mt-1">{staff.specialty}</span>
                <span className="text-sm">{staff.department} Department</span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{staff.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{staff.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {staff.joinDate}</span>
            </div>
            <div className="pt-2">
              <div className="text-sm font-medium mb-2">Schedule</div>
              <div className="space-y-1">
                {staff.schedule.map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="font-medium">{item.day}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{staff.bio}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Staff Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Staff ID</div>
                      <div>{staff.id}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>
                        <Badge variant={staff.status === "Active" ? "default" : "outline"}>{staff.status}</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Department</div>
                      <div>{staff.department}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Specialty</div>
                      <div>{staff.specialty}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">License Number</div>
                      <div>{staff.licenseNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Join Date</div>
                      <div>{staff.joinDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="qualifications" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Qualifications & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {staff.qualifications.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staff.schedule.map((item) => (
                      <div key={item.day} className="flex justify-between items-center border-b pb-2">
                        <div className="font-medium">{item.day}</div>
                        <div>{item.hours}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
