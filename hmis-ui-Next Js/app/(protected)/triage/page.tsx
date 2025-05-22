import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock, Search, UserPlus, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Triage | Hospital Management System",
  description: "Triage management for the Hospital Management System",
}

export default function TriagePage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Triage</h1>
        <p className="text-muted-foreground">Manage patient vital signs, billing, and queue patients to departments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Triaged Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 min</div>
            <p className="text-xs text-muted-foreground">-2 min from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Triage</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Triage</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">Queued to departments</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search patients by name, ID or phone..." className="pl-8" />
        </div>
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          New Patient
        </Button>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new">New Triage</TabsTrigger>
          <TabsTrigger value="pending">Pending (7)</TabsTrigger>
          <TabsTrigger value="completed">Completed (17)</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Select a patient to begin triage process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-id">Patient ID</Label>
                  <Input id="patient-id" placeholder="Enter patient ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Patient Name</Label>
                  <Input id="patient-name" placeholder="Patient name will appear here" disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-age">Age</Label>
                  <Input id="patient-age" placeholder="Age" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-gender">Gender</Label>
                  <Input id="patient-gender" placeholder="Gender" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-contact">Contact</Label>
                  <Input id="patient-contact" placeholder="Contact" disabled />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Retrieve Patient</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
              <CardDescription>Record patient vital signs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input id="temperature" placeholder="e.g. 37.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
                  <Input id="blood-pressure" placeholder="e.g. 120/80" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pulse-rate">Pulse Rate (bpm)</Label>
                  <Input id="pulse-rate" placeholder="e.g. 72" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respiratory-rate">Respiratory Rate (bpm)</Label>
                  <Input id="respiratory-rate" placeholder="e.g. 16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oxygen-saturation">Oxygen Saturation (%)</Label>
                  <Input id="oxygen-saturation" placeholder="e.g. 98" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" placeholder="e.g. 70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" placeholder="e.g. 170" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chief-complaint">Chief Complaint</Label>
                <Input id="chief-complaint" placeholder="Enter patient's main complaint" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter any additional observations or notes"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Add triage services to patient bill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service">Select Service</Label>
                <Select>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="triage-basic">Basic Triage (500 KES)</SelectItem>
                    <SelectItem value="triage-comprehensive">Comprehensive Triage (1,000 KES)</SelectItem>
                    <SelectItem value="triage-emergency">Emergency Triage (1,500 KES)</SelectItem>
                    <SelectItem value="triage-pediatric">Pediatric Triage (800 KES)</SelectItem>
                    <SelectItem value="triage-geriatric">Geriatric Triage (1,200 KES)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-mode">Mode of Payment</Label>
                <Select>
                  <SelectTrigger id="payment-mode">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 hidden" id="insurance-section">
                <Label htmlFor="insurance-provider">Insurance Provider</Label>
                <Select>
                  <SelectTrigger id="insurance-provider">
                    <SelectValue placeholder="Select insurance provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cic">CIC Insurance (EQ1234)</SelectItem>
                    <SelectItem value="jubilee">Jubilee Insurance (EQ1235)</SelectItem>
                    <SelectItem value="britam">Britam Insurance (EQ1236)</SelectItem>
                    <SelectItem value="aar">AAR Insurance (EQ1237)</SelectItem>
                    <SelectItem value="nhif">NHIF (EQ1238)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Selected Services</h4>
                <div className="bg-muted rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Basic Triage</span>
                    <span className="font-medium">500 KES</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 font-medium">
                  <span>Total</span>
                  <span>500 KES</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Queue Patient</CardTitle>
              <CardDescription>Queue patient to the next department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department">Select Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-consultation">General Consultation</SelectItem>
                    <SelectItem value="specialist-consultation">Specialist Consultation</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="obstetrics">Obstetrics & Gynecology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="ent">ENT</SelectItem>
                    <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes-for-doctor">Notes for Doctor</Label>
                <textarea
                  id="notes-for-doctor"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter any notes for the doctor"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Complete Triage & Queue Patient</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Triage</CardTitle>
              <CardDescription>Patients waiting for triage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">PT-2023{i.toString().padStart(4, "0")}</div>
                      <div>John Doe {i}</div>
                      <Badge variant={i <= 3 ? "destructive" : "outline"}>{i <= 3 ? "High Priority" : "Normal"}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-muted-foreground">Waiting: {i * 5} min</div>
                      <Button size="sm">Start Triage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Triage</CardTitle>
              <CardDescription>Patients who have completed triage today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">PT-2023{(i + 10).toString().padStart(4, "0")}</div>
                      <div>Jane Smith {i}</div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">Queued to: General Consultation</div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}

                {[6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">PT-2023{(i + 10).toString().padStart(4, "0")}</div>
                      <div>Robert Johnson {i}</div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">
                        Queued to: {i % 3 === 0 ? "Pediatrics" : i % 3 === 1 ? "Specialist Consultation" : "Emergency"}
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
