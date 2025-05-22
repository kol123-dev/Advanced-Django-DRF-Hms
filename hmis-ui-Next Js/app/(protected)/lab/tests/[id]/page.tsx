import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, CheckCircle2, Clock, Download, FileText, Printer, User } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// This would normally come from a database
const getLabTest = (id: string) => {
  // For demo purposes, return a mock lab test
  return {
    id: id,
    patientName: "Michael Chen",
    patientId: "P-1002",
    patientAvatar: "/placeholder.svg?height=64&width=64",
    testName: "Liver Function Test",
    category: "Biochemistry",
    requestedBy: "Dr. James Wilson",
    requestDate: "2023-07-16",
    status: "In Progress",
    priority: "Urgent",
    result: "Pending",
    progress: 60,
    estimatedCompletion: "2023-07-17",
    clinicalInfo: "Patient with history of alcohol use disorder. Monitoring liver function.",
    specialInstructions: "Fasting sample required. Please collect sample before 9 AM.",
    testComponents: [
      {
        name: "Alanine Aminotransferase (ALT)",
        status: "Completed",
        result: "45 U/L",
        referenceRange: "7-55 U/L",
        interpretation: "Normal",
      },
      {
        name: "Aspartate Aminotransferase (AST)",
        status: "Completed",
        result: "42 U/L",
        referenceRange: "8-48 U/L",
        interpretation: "Normal",
      },
      {
        name: "Alkaline Phosphatase (ALP)",
        status: "In Progress",
        result: "Pending",
        referenceRange: "40-129 U/L",
        interpretation: "Pending",
      },
      {
        name: "Total Bilirubin",
        status: "Pending",
        result: "Pending",
        referenceRange: "0.1-1.2 mg/dL",
        interpretation: "Pending",
      },
      {
        name: "Direct Bilirubin",
        status: "Pending",
        result: "Pending",
        referenceRange: "0.0-0.3 mg/dL",
        interpretation: "Pending",
      },
    ],
    timeline: [
      {
        date: "2023-07-16 09:15 AM",
        event: "Test requested by Dr. James Wilson",
        user: "Dr. James Wilson",
      },
      {
        date: "2023-07-16 10:30 AM",
        event: "Sample collected",
        user: "Nurse Robert Brown",
      },
      {
        date: "2023-07-16 11:45 AM",
        event: "Sample received in laboratory",
        user: "Lab Technician Karen White",
      },
      {
        date: "2023-07-16 01:30 PM",
        event: "Testing started",
        user: "Lab Technician Daniel Martin",
      },
      {
        date: "2023-07-16 02:45 PM",
        event: "ALT and AST results completed",
        user: "Lab Technician Daniel Martin",
      },
    ],
  }
}

export default function LabTestDetailPage({ params }: { params: { id: string } }) {
  const test = getLabTest(params.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {status}
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {status}
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "STAT":
        return <Badge variant="destructive">{priority}</Badge>
      case "Urgent":
        return <Badge variant="default">{priority}</Badge>
      case "Routine":
        return <Badge variant="outline">{priority}</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/lab">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Lab Test Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Test Information</CardTitle>
            <CardDescription>Details about the laboratory test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Test ID</span>
              <span>{test.id}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Test Name</span>
              <span>{test.testName}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Category</span>
              <span>{test.category}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              {getStatusBadge(test.status)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Priority</span>
              {getPriorityBadge(test.priority)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Requested By</span>
              <span>{test.requestedBy}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Request Date</span>
              <span>{test.requestDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Estimated Completion</span>
              <span>{test.estimatedCompletion}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <div className="flex flex-col gap-1">
                <Progress value={test.progress} className="h-2" />
                <span className="text-xs text-right">{test.progress}% Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient Information</CardTitle>
                  <CardDescription>Details about the patient</CardDescription>
                </div>
                <Link href={`/patients/${test.patientId}`}>
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    View Patient
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={test.patientAvatar || "/placeholder.svg"} alt={test.patientName} />
                  <AvatarFallback>{test.patientName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{test.patientName}</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: {test.patientId}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Clinical Information</h4>
                  <p className="text-sm">{test.clinicalInfo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Special Instructions</h4>
                  <p className="text-sm">{test.specialInstructions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="results">Test Results</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="results" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Results</CardTitle>
                  <CardDescription>Results for each component of the test</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {test.testComponents.map((component, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{component.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">Result: {component.result}</span>
                              <span className="text-xs text-muted-foreground">
                                Reference Range: {component.referenceRange}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span className="text-sm">Interpretation: {component.interpretation}</span>
                            </div>
                          </div>
                          {getStatusBadge(component.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {test.status === "In Progress" && <Button className="w-full">Enter Additional Results</Button>}
                  {test.status === "Completed" && <Button className="w-full">View Complete Report</Button>}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Timeline</CardTitle>
                  <CardDescription>History of actions taken for this test</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {test.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative flex h-full w-6 items-center justify-center">
                          <div className="absolute h-full w-px bg-border" />
                          <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex flex-col pb-4">
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                          <span className="font-medium">{event.event}</span>
                          <span className="text-sm text-muted-foreground">{event.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Add Timeline Event
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
