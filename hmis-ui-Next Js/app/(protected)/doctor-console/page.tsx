import {
  Activity,
  Calendar,
  Clock,
  FileText,
  FlaskRoundIcon as Flask,
  Heart,
  Pill,
  Thermometer,
  UserRound,
  Users,
  Clipboard,
  ArrowRight,
  Plus,
  BarChart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function DoctorConsolePage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Console</h1>
          <p className="text-muted-foreground">Manage patient consultations, diagnoses, and treatments</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="dr-smith">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dr-smith">Dr. Smith</SelectItem>
              <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
              <SelectItem value="dr-patel">Dr. Patel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Waiting</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Seen Today</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Lab Results</CardTitle>
            <Flask className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 urgent results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Consultation Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18m</div>
            <p className="text-xs text-muted-foreground">-2m from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="queue">Patient Queue</TabsTrigger>
          <TabsTrigger value="current">Current Patient</TabsTrigger>
          <TabsTrigger value="lab">Lab Orders</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="history">Patient History</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Patients</CardTitle>
              <CardDescription>Patients waiting for consultation in your queue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    All
                  </Button>
                  <Button variant="outline" size="sm" className="flex gap-1 items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    High Priority
                  </Button>
                  <Button variant="outline" size="sm" className="flex gap-1 items-center">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    Medium Priority
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Search patients..." className="w-[200px]" />
                </div>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {/* High Priority Patient */}
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">John Doe</h4>
                            <div className="text-sm text-muted-foreground">ID: P-12345 • 45M</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                High Priority
                              </Badge>
                              <Badge variant="outline">Chest Pain</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Waiting: 12m</div>
                          <div className="text-xs text-muted-foreground">Triaged at 10:45 AM</div>
                          <Button className="mt-2" size="sm">
                            Start Consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span>
                          <span className="font-medium text-red-600"> 160/95</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium"> 37.2°C</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pulse:</span>
                          <span className="font-medium text-red-600"> 112 bpm</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Medium Priority Patient */}
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Jane Smith</h4>
                            <div className="text-sm text-muted-foreground">ID: P-12346 • 32F</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                Medium Priority
                              </Badge>
                              <Badge variant="outline">Abdominal Pain</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Waiting: 25m</div>
                          <div className="text-xs text-muted-foreground">Triaged at 10:32 AM</div>
                          <Button className="mt-2" size="sm">
                            Start Consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span>
                          <span className="font-medium"> 120/80</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium"> 37.8°C</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pulse:</span>
                          <span className="font-medium"> 88 bpm</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Normal Priority Patient */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Robert Johnson</h4>
                            <div className="text-sm text-muted-foreground">ID: P-12347 • 28M</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Normal Priority
                              </Badge>
                              <Badge variant="outline">Follow-up</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Waiting: 35m</div>
                          <div className="text-xs text-muted-foreground">Triaged at 10:22 AM</div>
                          <Button className="mt-2" size="sm">
                            Start Consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span>
                          <span className="font-medium"> 118/78</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium"> 36.9°C</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pulse:</span>
                          <span className="font-medium"> 72 bpm</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* More patients... */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>MP</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Maria Perez</h4>
                            <div className="text-sm text-muted-foreground">ID: P-12348 • 56F</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Normal Priority
                              </Badge>
                              <Badge variant="outline">Headache</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Waiting: 40m</div>
                          <div className="text-xs text-muted-foreground">Triaged at 10:17 AM</div>
                          <Button className="mt-2" size="sm">
                            Start Consultation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span>
                          <span className="font-medium"> 135/85</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="font-medium"> 37.1°C</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pulse:</span>
                          <span className="font-medium"> 76 bpm</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Patient</span>
                  <Badge>High Priority</Badge>
                </CardTitle>
                <CardDescription>Patient information and vital signs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">ID: P-12345 • 45M • Blood Type: O+</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2">Vital Signs</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Pressure</p>
                        <p className="font-medium text-red-600">160/95 mmHg</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="font-medium">37.2 °C</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Activity className="h-4 w-4 text-pink-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pulse Rate</p>
                        <p className="font-medium text-red-600">112 bpm</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Respiratory Rate</p>
                        <p className="font-medium">18 bpm</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Activity className="h-4 w-4 text-indigo-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Oxygen Saturation</p>
                        <p className="font-medium">98 %</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-medium">82 kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2">Triage Notes</h4>
                  <div className="rounded-md border p-3 text-sm">
                    <p>
                      Patient presents with severe chest pain radiating to left arm. Pain started 2 hours ago. Patient
                      describes it as "crushing" and rates it 8/10. History of hypertension.
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-red-50">
                      Penicillin
                    </Badge>
                    <Badge variant="outline" className="bg-red-50">
                      Sulfa Drugs
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Medical History
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle>Examination & Diagnosis</CardTitle>
                <CardDescription>Record your findings and diagnosis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="examination">Physical Examination</Label>
                  <Textarea
                    id="examination"
                    placeholder="Enter physical examination findings..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Textarea id="assessment" placeholder="Enter your assessment..." className="min-h-[100px]" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diagnosis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="i20.9">Angina Pectoris (I20.9)</SelectItem>
                        <SelectItem value="i21.9">Acute Myocardial Infarction (I21.9)</SelectItem>
                        <SelectItem value="i10">Essential Hypertension (I10)</SelectItem>
                        <SelectItem value="j45.909">Unspecified Asthma (J45.909)</SelectItem>
                        <SelectItem value="e11.9">Type 2 Diabetes (E11.9)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Additional Diagnosis
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan">Treatment Plan</Label>
                    <Textarea id="plan" placeholder="Enter treatment plan..." className="min-h-[100px]" />
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  <Button>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Save Examination
                  </Button>
                  <Button variant="outline">
                    <Flask className="mr-2 h-4 w-4" />
                    Order Lab Tests
                  </Button>
                  <Button variant="outline">
                    <Pill className="mr-2 h-4 w-4" />
                    Prescribe Medication
                  </Button>
                  <Button variant="outline">
                    <UserRound className="mr-2 h-4 w-4" />
                    Refer to Specialist
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Follow-up
                  </Button>
                  <Button variant="secondary" className="ml-auto">
                    Complete Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab Orders</CardTitle>
              <CardDescription>Order and view lab tests for patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="new-order" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="new-order">New Order</TabsTrigger>
                  <TabsTrigger value="pending">Pending Results</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="new-order" className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <Select defaultValue="john-doe">
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-doe">John Doe (Current)</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                          <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select defaultValue="urgent">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="routine">Routine</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="stat">STAT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Test Categories</Label>
                    <div className="grid gap-2 md:grid-cols-3">
                      <Card className="p-3 cursor-pointer border-primary">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                          <div className="font-medium">Hematology</div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">CBC, Blood Smear, Coagulation</div>
                      </Card>
                      <Card className="p-3 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-muted"></div>
                          <div className="font-medium">Chemistry</div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">Electrolytes, Liver Function, Lipids</div>
                      </Card>
                      <Card className="p-3 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-muted"></div>
                          <div className="font-medium">Cardiac</div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">Troponin, CK-MB, BNP</div>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Selected Tests</Label>
                    <ScrollArea className="h-[200px] rounded-md border">
                      <div className="p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[30px]"></TableHead>
                              <TableHead>Test Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div className="h-4 w-4 rounded-full bg-primary"></div>
                              </TableCell>
                              <TableCell className="font-medium">Complete Blood Count (CBC)</TableCell>
                              <TableCell>Hematology</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                  </svg>
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="h-4 w-4 rounded-full bg-primary"></div>
                              </TableCell>
                              <TableCell className="font-medium">Prothrombin Time (PT)</TableCell>
                              <TableCell>Hematology</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                  </svg>
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <div className="h-4 w-4 rounded-full bg-primary"></div>
                              </TableCell>
                              <TableCell className="font-medium">Partial Thromboplastin Time (PTT)</TableCell>
                              <TableCell>Hematology</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                  </svg>
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Clinical Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any clinical notes or special instructions..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit Lab Order</Button>
                  </div>
                </TabsContent>

                <TabsContent value="pending" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">John Doe - CBC, Cardiac Panel</CardTitle>
                              <CardDescription>Ordered: Today at 10:55 AM • Priority: Urgent</CardDescription>
                            </div>
                            <Badge>In Progress</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-muted-foreground">Tests:</span>
                                <span className="font-medium"> 3 tests</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Expected:</span>
                                <span className="font-medium"> Today at 12:30 PM</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium"> Sample collected, processing</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="ml-auto">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Maria Perez - Thyroid Panel</CardTitle>
                              <CardDescription>Ordered: Today at 09:30 AM • Priority: Routine</CardDescription>
                            </div>
                            <Badge variant="outline">Awaiting Sample</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-muted-foreground">Tests:</span>
                                <span className="font-medium"> 2 tests</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Expected:</span>
                                <span className="font-medium"> Today at 2:00 PM</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium"> Waiting for sample collection</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="ml-auto">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="completed" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Robert Johnson - Liver Function</CardTitle>
                              <CardDescription>Completed: Yesterday at 3:45 PM</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-muted-foreground">Tests:</span>
                                <span className="font-medium"> 4 tests</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Results:</span>
                                <span className="font-medium text-amber-600"> Abnormal (2)</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button size="sm" className="ml-auto">
                            View Results
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Jane Smith - Urinalysis</CardTitle>
                              <CardDescription>Completed: Yesterday at 1:15 PM</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-muted-foreground">Tests:</span>
                                <span className="font-medium"> 1 test</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Results:</span>
                                <span className="font-medium text-green-600"> Normal</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button size="sm" className="ml-auto">
                            View Results
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>Create and manage patient prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="new" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="new">New Prescription</TabsTrigger>
                  <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
                  <TabsTrigger value="history">Prescription History</TabsTrigger>
                </TabsList>

                <TabsContent value="new" className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <Select defaultValue="john-doe">
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-doe">John Doe (Current)</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                          <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Diagnosis</Label>
                      <Select defaultValue="i20.9">
                        <SelectTrigger>
                          <SelectValue placeholder="Select diagnosis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="i20.9">Angina Pectoris (I20.9)</SelectItem>
                          <SelectItem value="i21.9">Acute Myocardial Infarction (I21.9)</SelectItem>
                          <SelectItem value="i10">Essential Hypertension (I10)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Medications</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Medication
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Medication</Label>
                              <div className="flex space-x-2">
                                <Select defaultValue="aspirin">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select medication" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="aspirin">Aspirin</SelectItem>
                                    <SelectItem value="atorvastatin">Atorvastatin</SelectItem>
                                    <SelectItem value="metoprolol">Metoprolol</SelectItem>
                                    <SelectItem value="nitroglycerin">Nitroglycerin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                  </svg>
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Dosage</Label>
                              <Select defaultValue="81mg">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select dosage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="81mg">81 mg</SelectItem>
                                  <SelectItem value="325mg">325 mg</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label>Route</Label>
                              <Select defaultValue="oral">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select route" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="oral">Oral</SelectItem>
                                  <SelectItem value="sublingual">Sublingual</SelectItem>
                                  <SelectItem value="topical">Topical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Select defaultValue="daily">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Once daily</SelectItem>
                                  <SelectItem value="bid">Twice daily (BID)</SelectItem>
                                  <SelectItem value="tid">Three times daily (TID)</SelectItem>
                                  <SelectItem value="qid">Four times daily (QID)</SelectItem>
                                  <SelectItem value="prn">As needed (PRN)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <div className="flex space-x-2">
                                <Input type="number" placeholder="30" />
                                <Select defaultValue="days">
                                  <SelectTrigger className="w-[110px]">
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="days">Days</SelectItem>
                                    <SelectItem value="weeks">Weeks</SelectItem>
                                    <SelectItem value="months">Months</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Special Instructions</Label>
                            <Textarea placeholder="Take with food. Avoid alcohol." />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Medication</Label>
                              <div className="flex space-x-2">
                                <Select defaultValue="metoprolol">
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select medication" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="aspirin">Aspirin</SelectItem>
                                    <SelectItem value="atorvastatin">Atorvastatin</SelectItem>
                                    <SelectItem value="metoprolol">Metoprolol</SelectItem>
                                    <SelectItem value="nitroglycerin">Nitroglycerin</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                  </svg>
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Dosage</Label>
                              <Select defaultValue="25mg">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select dosage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="25mg">25 mg</SelectItem>
                                  <SelectItem value="50mg">50 mg</SelectItem>
                                  <SelectItem value="100mg">100 mg</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label>Route</Label>
                              <Select defaultValue="oral">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select route" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="oral">Oral</SelectItem>
                                  <SelectItem value="sublingual">Sublingual</SelectItem>
                                  <SelectItem value="topical">Topical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Select defaultValue="bid">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Once daily</SelectItem>
                                  <SelectItem value="bid">Twice daily (BID)</SelectItem>
                                  <SelectItem value="tid">Three times daily (TID)</SelectItem>
                                  <SelectItem value="qid">Four times daily (QID)</SelectItem>
                                  <SelectItem value="prn">As needed (PRN)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <div className="flex space-x-2">
                                <Input type="number" placeholder="30" />
                                <Select defaultValue="days">
                                  <SelectTrigger className="w-[110px]">
                                    <SelectValue placeholder="Unit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="days">Days</SelectItem>
                                    <SelectItem value="weeks">Weeks</SelectItem>
                                    <SelectItem value="months">Months</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Special Instructions</Label>
                            <Textarea placeholder="Take with food. May cause dizziness." />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes or instructions..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Prescription</Button>
                  </div>
                </TabsContent>

                <TabsContent value="active" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">John Doe - Cardiac Medications</CardTitle>
                              <CardDescription>Prescribed: Today at 11:15 AM • 2 medications</CardDescription>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Aspirin 81mg</div>
                                <div className="text-sm text-muted-foreground">30 days</div>
                              </div>
                              <div className="text-sm">Once daily • Oral • Take with food</div>
                            </div>
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Metoprolol 25mg</div>
                                <div className="text-sm text-muted-foreground">30 days</div>
                              </div>
                              <div className="text-sm">Twice daily • Oral • May cause dizziness</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">
                            Refill
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Modify
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Print
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Jane Smith - Pain Management</CardTitle>
                              <CardDescription>Prescribed: Yesterday at 2:30 PM • 1 medication</CardDescription>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Ibuprofen 600mg</div>
                                <div className="text-sm text-muted-foreground">7 days</div>
                              </div>
                              <div className="text-sm">Three times daily • Oral • Take with food</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">
                            Refill
                          </Button>
                          <Button variant="outline" size="sm" className="ml-2">
                            Modify
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Print
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="history" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Robert Johnson - Antibiotics</CardTitle>
                              <CardDescription>Prescribed: 2 weeks ago • 1 medication</CardDescription>
                            </div>
                            <Badge variant="outline">Completed</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Amoxicillin 500mg</div>
                                <div className="text-sm text-muted-foreground">10 days</div>
                              </div>
                              <div className="text-sm">Three times daily • Oral • Complete full course</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">
                            Renew
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-base">Maria Perez - Allergy Medication</CardTitle>
                              <CardDescription>Prescribed: 1 month ago • 2 medications</CardDescription>
                            </div>
                            <Badge variant="outline">Completed</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Cetirizine 10mg</div>
                                <div className="text-sm text-muted-foreground">30 days</div>
                              </div>
                              <div className="text-sm">Once daily • Oral • Take as needed</div>
                            </div>
                            <div className="rounded-md border p-2">
                              <div className="flex justify-between">
                                <div className="font-medium">Fluticasone Nasal Spray</div>
                                <div className="text-sm text-muted-foreground">30 days</div>
                              </div>
                              <div className="text-sm">Twice daily • Nasal • 1 spray each nostril</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm">
                            Renew
                          </Button>
                          <Button variant="outline" size="sm" className="ml-auto">
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient History</CardTitle>
              <CardDescription>View patient's medical history and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="john-doe">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe (Current)</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="w-[100px] text-sm text-muted-foreground">Today</div>
                        <div className="flex-1 space-y-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Triage Assessment</CardTitle>
                                <Badge>10:45 AM</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                Patient presented with severe chest pain radiating to left arm. Vital signs: BP 160/95,
                                HR 112, Temp 37.2°C.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-[100px] text-sm text-muted-foreground">Yesterday</div>
                        <div className="flex-1 space-y-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Prescription</CardTitle>
                                <Badge>3:15 PM</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">Prescribed Lisinopril 10mg once daily for hypertension.</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Follow-up Consultation</CardTitle>
                                <Badge>2:30 PM</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                Follow-up for hypertension. BP improved to 145/90. Recommended continued medication and
                                lifestyle modifications.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-[100px] text-sm text-muted-foreground">Last Week</div>
                        <div className="flex-1 space-y-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Lab Results</CardTitle>
                                <Badge>Monday</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                Lipid panel results: Total Cholesterol 240 mg/dL (High), LDL 160 mg/dL (High), HDL 45
                                mg/dL, Triglycerides 180 mg/dL (High).
                              </p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Initial Consultation</CardTitle>
                                <Badge>Monday</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                Initial assessment for hypertension. BP 170/100. Ordered lipid panel and basic metabolic
                                panel.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="diagnoses" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Today</TableCell>
                          <TableCell className="font-medium">Angina Pectoris</TableCell>
                          <TableCell>I20.9</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Yesterday</TableCell>
                          <TableCell className="font-medium">Essential Hypertension</TableCell>
                          <TableCell>I10</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Last Month</TableCell>
                          <TableCell className="font-medium">Hyperlipidemia</TableCell>
                          <TableCell>E78.5</TableCell>
                          <TableCell>Dr. Johnson</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>3 Months Ago</TableCell>
                          <TableCell className="font-medium">Acute Bronchitis</TableCell>
                          <TableCell>J20.9</TableCell>
                          <TableCell>Dr. Patel</TableCell>
                          <TableCell>
                            <Badge variant="outline">Resolved</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="medications" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Prescriber</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Aspirin</TableCell>
                          <TableCell>81mg once daily</TableCell>
                          <TableCell>Today</TableCell>
                          <TableCell>30 days</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Metoprolol</TableCell>
                          <TableCell>25mg twice daily</TableCell>
                          <TableCell>Today</TableCell>
                          <TableCell>30 days</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Lisinopril</TableCell>
                          <TableCell>10mg once daily</TableCell>
                          <TableCell>Yesterday</TableCell>
                          <TableCell>30 days</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Atorvastatin</TableCell>
                          <TableCell>20mg once daily</TableCell>
                          <TableCell>Last Month</TableCell>
                          <TableCell>90 days</TableCell>
                          <TableCell>Dr. Johnson</TableCell>
                          <TableCell>
                            <Badge>Active</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Amoxicillin</TableCell>
                          <TableCell>500mg three times daily</TableCell>
                          <TableCell>3 Months Ago</TableCell>
                          <TableCell>10 days</TableCell>
                          <TableCell>Dr. Patel</TableCell>
                          <TableCell>
                            <Badge variant="outline">Completed</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="lab-results" className="pt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Lipid Panel</CardTitle>
                          <CardDescription>Last Week • Dr. Smith</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Test</TableHead>
                                <TableHead>Result</TableHead>
                                <TableHead>Reference Range</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Total Cholesterol</TableCell>
                                <TableCell className="font-medium">240 mg/dL</TableCell>
                                <TableCell>&lt;200 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-red-50 text-red-800">
                                    High
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>LDL Cholesterol</TableCell>
                                <TableCell className="font-medium">160 mg/dL</TableCell>
                                <TableCell>&lt;100 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-red-50 text-red-800">
                                    High
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>HDL Cholesterol</TableCell>
                                <TableCell className="font-medium">45 mg/dL</TableCell>
                                <TableCell>&gt;40 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-800">
                                    Normal
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Triglycerides</TableCell>
                                <TableCell className="font-medium">180 mg/dL</TableCell>
                                <TableCell>&lt;150 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-red-50 text-red-800">
                                    High
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Basic Metabolic Panel</CardTitle>
                          <CardDescription>Last Week • Dr. Smith</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Test</TableHead>
                                <TableHead>Result</TableHead>
                                <TableHead>Reference Range</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>Glucose</TableCell>
                                <TableCell className="font-medium">105 mg/dL</TableCell>
                                <TableCell>70-99 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                                    Borderline
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Creatinine</TableCell>
                                <TableCell className="font-medium">0.9 mg/dL</TableCell>
                                <TableCell>0.6-1.2 mg/dL</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-800">
                                    Normal
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Sodium</TableCell>
                                <TableCell className="font-medium">140 mEq/L</TableCell>
                                <TableCell>135-145 mEq/L</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-800">
                                    Normal
                                  </Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Potassium</TableCell>
                                <TableCell className="font-medium">4.2 mEq/L</TableCell>
                                <TableCell>3.5-5.0 mEq/L</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-800">
                                    Normal
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
