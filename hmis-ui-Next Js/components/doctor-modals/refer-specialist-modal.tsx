"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { UserRound, CheckCircle2, Search } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ReferSpecialistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
}

interface Specialist {
  id: string
  name: string
  specialty: string
  hospital: string
  availability: string
  avatar: string
}

export function ReferSpecialistModal({ open, onOpenChange, patientName }: ReferSpecialistModalProps) {
  const [referring, setReferring] = useState(false)
  const [referred, setReferred] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null)
  const [referralType, setReferralType] = useState("standard")

  const specialists: Specialist[] = [
    {
      id: "dr-williams",
      name: "Dr. Sarah Williams",
      specialty: "Cardiology",
      hospital: "Central Hospital",
      availability: "Next available: 3 days",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dr-patel",
      name: "Dr. Raj Patel",
      specialty: "Neurology",
      hospital: "University Medical Center",
      availability: "Next available: 1 week",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dr-chen",
      name: "Dr. Li Chen",
      specialty: "Endocrinology",
      hospital: "Memorial Hospital",
      availability: "Next available: 2 days",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dr-rodriguez",
      name: "Dr. Maria Rodriguez",
      specialty: "Pulmonology",
      hospital: "Central Hospital",
      availability: "Next available: 5 days",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dr-johnson",
      name: "Dr. Michael Johnson",
      specialty: "Gastroenterology",
      hospital: "University Medical Center",
      availability: "Next available: 4 days",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dr-kim",
      name: "Dr. Soo-Jin Kim",
      specialty: "Rheumatology",
      hospital: "Memorial Hospital",
      availability: "Next available: 1 week",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredSpecialists = specialists.filter(
    (specialist) =>
      specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialist.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefer = () => {
    setReferring(true)
    // Simulate API call
    setTimeout(() => {
      setReferring(false)
      setReferred(true)
      setTimeout(() => {
        setReferred(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Refer to Specialist</DialogTitle>
          <DialogDescription>Create a specialist referral for {patientName}</DialogDescription>
        </DialogHeader>
        {referred ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Referral Created</h3>
            <p className="text-sm text-muted-foreground text-center">
              The patient has been successfully referred to the specialist.
            </p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Specialists</TabsTrigger>
                <TabsTrigger value="department">By Department</TabsTrigger>
                <TabsTrigger value="recent">Recently Referred</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4 pt-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search specialists by name or specialty..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {filteredSpecialists.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No specialists found matching your search.
                      </div>
                    ) : (
                      filteredSpecialists.map((specialist) => (
                        <div
                          key={specialist.id}
                          className={`flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 ${
                            selectedSpecialist === specialist.id ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setSelectedSpecialist(specialist.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={specialist.avatar || "/placeholder.svg"} alt={specialist.name} />
                              <AvatarFallback>{specialist.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{specialist.name}</div>
                              <div className="text-sm text-muted-foreground">{specialist.specialty}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {specialist.hospital} • {specialist.availability}
                              </div>
                            </div>
                          </div>
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value={specialist.id} id={specialist.id} className="mt-1" />
                          </RadioGroup>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="department" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-williams" ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-williams")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Cardiology</div>
                        <Badge>3 specialists</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            selectedSpecialist === "dr-williams" ? "bg-primary/10" : ""
                          }`}
                        >
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-williams" id="dr-williams-dept" />
                          </RadioGroup>
                          <Label htmlFor="dr-williams-dept" className="flex-1 cursor-pointer">
                            Dr. Sarah Williams
                          </Label>
                          <span className="text-xs text-muted-foreground">3 days</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-md">
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-smith" id="dr-smith" />
                          </RadioGroup>
                          <Label htmlFor="dr-smith" className="flex-1 cursor-pointer">
                            Dr. John Smith
                          </Label>
                          <span className="text-xs text-muted-foreground">1 week</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-md">
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-brown" id="dr-brown" />
                          </RadioGroup>
                          <Label htmlFor="dr-brown" className="flex-1 cursor-pointer">
                            Dr. Emily Brown
                          </Label>
                          <span className="text-xs text-muted-foreground">2 weeks</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-patel" ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-patel")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Neurology</div>
                        <Badge>2 specialists</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            selectedSpecialist === "dr-patel" ? "bg-primary/10" : ""
                          }`}
                        >
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-patel" id="dr-patel-dept" />
                          </RadioGroup>
                          <Label htmlFor="dr-patel-dept" className="flex-1 cursor-pointer">
                            Dr. Raj Patel
                          </Label>
                          <span className="text-xs text-muted-foreground">1 week</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-md">
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-wilson" id="dr-wilson" />
                          </RadioGroup>
                          <Label htmlFor="dr-wilson" className="flex-1 cursor-pointer">
                            Dr. James Wilson
                          </Label>
                          <span className="text-xs text-muted-foreground">10 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-chen" ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-chen")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Endocrinology</div>
                        <Badge>1 specialist</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            selectedSpecialist === "dr-chen" ? "bg-primary/10" : ""
                          }`}
                        >
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-chen" id="dr-chen-dept" />
                          </RadioGroup>
                          <Label htmlFor="dr-chen-dept" className="flex-1 cursor-pointer">
                            Dr. Li Chen
                          </Label>
                          <span className="text-xs text-muted-foreground">2 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-rodriguez" ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-rodriguez")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Pulmonology</div>
                        <Badge>1 specialist</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            selectedSpecialist === "dr-rodriguez" ? "bg-primary/10" : ""
                          }`}
                        >
                          <RadioGroup value={selectedSpecialist || ""} className="flex">
                            <RadioGroupItem value="dr-rodriguez" id="dr-rodriguez-dept" />
                          </RadioGroup>
                          <Label htmlFor="dr-rodriguez-dept" className="flex-1 cursor-pointer">
                            Dr. Maria Rodriguez
                          </Label>
                          <span className="text-xs text-muted-foreground">5 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div
                    className={`flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-williams" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-williams")}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Sarah Williams" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Dr. Sarah Williams</div>
                        <div className="text-sm text-muted-foreground">Cardiology</div>
                        <div className="text-xs text-muted-foreground mt-1">Referred 2 weeks ago</div>
                      </div>
                    </div>
                    <RadioGroup value={selectedSpecialist || ""} className="flex">
                      <RadioGroupItem value="dr-williams" id="dr-williams-recent" className="mt-1" />
                    </RadioGroup>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 ${
                      selectedSpecialist === "dr-patel" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedSpecialist("dr-patel")}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Raj Patel" />
                        <AvatarFallback>RP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Dr. Raj Patel</div>
                        <div className="text-sm text-muted-foreground">Neurology</div>
                        <div className="text-xs text-muted-foreground mt-1">Referred 1 month ago</div>
                      </div>
                    </div>
                    <RadioGroup value={selectedSpecialist || ""} className="flex">
                      <RadioGroupItem value="dr-patel" id="dr-patel-recent" className="mt-1" />
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Referral Type</Label>
                <RadioGroup value={referralType} onValueChange={setReferralType} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Referral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent">Urgent Referral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consultation" id="consultation" />
                    <Label htmlFor="consultation">Consultation Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Reason for Referral</Label>
                <Textarea placeholder="Enter the clinical reason for this referral..." className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Relevant Diagnosis</Label>
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
                </div>

                <div className="space-y-2">
                  <Label>Preferred Timeframe</Label>
                  <Select defaultValue="within-2-weeks">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="within-1-week">Within 1 week</SelectItem>
                      <SelectItem value="within-2-weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="within-1-month">Within 1 month</SelectItem>
                      <SelectItem value="no-preference">No preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="attach-records" defaultChecked />
                <Label htmlFor="attach-records">Attach relevant medical records</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="notify-patient" defaultChecked />
                <Label htmlFor="notify-patient">Notify patient about referral</Label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleRefer} disabled={referring || !selectedSpecialist}>
                {referring ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Referring...
                  </>
                ) : (
                  <>
                    <UserRound className="mr-2 h-4 w-4" />
                    Refer to Specialist
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
