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
import { Pill, CheckCircle2, Search, Plus, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PrescribeMedicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
}

interface Medication {
  id: string
  name: string
  dosages: string[]
  category: string
  route: string
  frequency: string[]
  instructions: string
}

export function PrescribeMedicationModal({ open, onOpenChange, patientName }: PrescribeMedicationModalProps) {
  const [prescribing, setPrescribing] = useState(false)
  const [prescribed, setPrescribed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMedications, setSelectedMedications] = useState<
    Array<{
      medicationId: string
      dosage: string
      route: string
      frequency: string
      duration: string
      durationType: string
      instructions: string
    }>
  >([])

  const medications: Medication[] = [
    {
      id: "aspirin",
      name: "Aspirin",
      dosages: ["81mg", "325mg"],
      category: "Analgesic/Antiplatelet",
      route: "Oral",
      frequency: ["Once daily", "Twice daily", "As needed"],
      instructions: "Take with food to reduce stomach irritation.",
    },
    {
      id: "lisinopril",
      name: "Lisinopril",
      dosages: ["5mg", "10mg", "20mg", "40mg"],
      category: "ACE Inhibitor",
      route: "Oral",
      frequency: ["Once daily", "Twice daily"],
      instructions: "May cause dizziness. Monitor blood pressure regularly.",
    },
    {
      id: "metformin",
      name: "Metformin",
      dosages: ["500mg", "850mg", "1000mg"],
      category: "Antidiabetic",
      route: "Oral",
      frequency: ["Once daily", "Twice daily", "Three times daily"],
      instructions: "Take with meals to reduce gastrointestinal side effects.",
    },
    {
      id: "atorvastatin",
      name: "Atorvastatin",
      dosages: ["10mg", "20mg", "40mg", "80mg"],
      category: "Statin",
      route: "Oral",
      frequency: ["Once daily"],
      instructions: "Take in the evening. Avoid grapefruit juice.",
    },
    {
      id: "metoprolol",
      name: "Metoprolol",
      dosages: ["25mg", "50mg", "100mg", "200mg"],
      category: "Beta Blocker",
      route: "Oral",
      frequency: ["Once daily", "Twice daily"],
      instructions: "May cause dizziness or fatigue. Monitor heart rate.",
    },
    {
      id: "amoxicillin",
      name: "Amoxicillin",
      dosages: ["250mg", "500mg", "875mg"],
      category: "Antibiotic",
      route: "Oral",
      frequency: ["Twice daily", "Three times daily"],
      instructions: "Complete the full course even if symptoms improve.",
    },
    {
      id: "levothyroxine",
      name: "Levothyroxine",
      dosages: ["25mcg", "50mcg", "75mcg", "88mcg", "100mcg", "112mcg", "125mcg", "150mcg"],
      category: "Thyroid Hormone",
      route: "Oral",
      frequency: ["Once daily"],
      instructions: "Take on an empty stomach, 30-60 minutes before breakfast.",
    },
    {
      id: "albuterol",
      name: "Albuterol",
      dosages: ["90mcg/puff"],
      category: "Bronchodilator",
      route: "Inhalation",
      frequency: ["As needed", "Every 4-6 hours"],
      instructions: "Use as needed for shortness of breath or wheezing.",
    },
  ]

  const filteredMedications = medications.filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addMedication = (medication: Medication) => {
    if (!selectedMedications.some((med) => med.medicationId === medication.id)) {
      setSelectedMedications([
        ...selectedMedications,
        {
          medicationId: medication.id,
          dosage: medication.dosages[0],
          route: medication.route,
          frequency: medication.frequency[0],
          duration: "30",
          durationType: "days",
          instructions: medication.instructions,
        },
      ])
    }
  }

  const removeMedication = (medicationId: string) => {
    setSelectedMedications(selectedMedications.filter((med) => med.medicationId !== medicationId))
  }

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = [...selectedMedications]
    updatedMedications[index] = { ...updatedMedications[index], [field]: value }
    setSelectedMedications(updatedMedications)
  }

  const handlePrescribe = () => {
    setPrescribing(true)
    // Simulate API call
    setTimeout(() => {
      setPrescribing(false)
      setPrescribed(true)
      setTimeout(() => {
        setPrescribed(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Prescribe Medication</DialogTitle>
          <DialogDescription>Create a prescription for {patientName}</DialogDescription>
        </DialogHeader>
        {prescribed ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Prescription Created</h3>
            <p className="text-sm text-muted-foreground text-center">
              {selectedMedications.length} medication(s) have been prescribed successfully.
            </p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Medications</TabsTrigger>
                <TabsTrigger value="common">Common Medications</TabsTrigger>
                <TabsTrigger value="recent">Recently Prescribed</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4 pt-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search medications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {filteredMedications.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No medications found matching your search.
                      </div>
                    ) : (
                      filteredMedications.map((medication) => (
                        <div
                          key={medication.id}
                          className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                          onClick={() => addMedication(medication)}
                        >
                          <div>
                            <div className="font-medium">{medication.name}</div>
                            <div className="text-sm text-muted-foreground">{medication.category}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add</span>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="common" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "aspirin")!)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Aspirin</div>
                      <div className="text-sm text-muted-foreground">Analgesic/Antiplatelet</div>
                      <div className="mt-2 text-xs">Common dosages: 81mg, 325mg</div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "lisinopril")!)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Lisinopril</div>
                      <div className="text-sm text-muted-foreground">ACE Inhibitor</div>
                      <div className="mt-2 text-xs">Common dosages: 10mg, 20mg</div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "metoprolol")!)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Metoprolol</div>
                      <div className="text-sm text-muted-foreground">Beta Blocker</div>
                      <div className="mt-2 text-xs">Common dosages: 25mg, 50mg, 100mg</div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "atorvastatin")!)}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">Atorvastatin</div>
                      <div className="text-sm text-muted-foreground">Statin</div>
                      <div className="mt-2 text-xs">Common dosages: 10mg, 20mg, 40mg</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div
                    className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "lisinopril")!)}
                  >
                    <div>
                      <div className="font-medium">Lisinopril 10mg</div>
                      <div className="text-sm text-muted-foreground">Prescribed 2 days ago</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "metformin")!)}
                  >
                    <div>
                      <div className="font-medium">Metformin 500mg</div>
                      <div className="text-sm text-muted-foreground">Prescribed 1 week ago</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => addMedication(medications.find((m) => m.id === "amoxicillin")!)}
                  >
                    <div>
                      <div className="font-medium">Amoxicillin 500mg</div>
                      <div className="text-sm text-muted-foreground">Prescribed 2 weeks ago</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label>Selected Medications ({selectedMedications.length})</Label>
                {selectedMedications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setSelectedMedications([])}>
                    Clear All
                  </Button>
                )}
              </div>

              {selectedMedications.length > 0 ? (
                <div className="space-y-4">
                  {selectedMedications.map((med, index) => {
                    const medication = medications.find((m) => m.id === med.medicationId)!
                    return (
                      <Card key={index} className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6"
                          onClick={() => removeMedication(med.medicationId)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                        <CardContent className="p-4 pt-6">
                          <div className="font-medium text-lg">{medication.name}</div>
                          <div className="text-sm text-muted-foreground mb-4">{medication.category}</div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Dosage</Label>
                              <Select
                                value={med.dosage}
                                onValueChange={(value) => updateMedication(index, "dosage", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select dosage" />
                                </SelectTrigger>
                                <SelectContent>
                                  {medication.dosages.map((dosage) => (
                                    <SelectItem key={dosage} value={dosage}>
                                      {dosage}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Route</Label>
                              <Select
                                value={med.route}
                                onValueChange={(value) => updateMedication(index, "route", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select route" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Oral">Oral</SelectItem>
                                  <SelectItem value="Inhalation">Inhalation</SelectItem>
                                  <SelectItem value="Topical">Topical</SelectItem>
                                  <SelectItem value="Subcutaneous">Subcutaneous</SelectItem>
                                  <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Frequency</Label>
                              <Select
                                value={med.frequency}
                                onValueChange={(value) => updateMedication(index, "frequency", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                  {medication.frequency.map((freq) => (
                                    <SelectItem key={freq} value={freq}>
                                      {freq}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <div className="flex space-x-2">
                                <Input
                                  type="number"
                                  value={med.duration}
                                  onChange={(e) => updateMedication(index, "duration", e.target.value)}
                                  min="1"
                                />
                                <Select
                                  value={med.durationType}
                                  onValueChange={(value) => updateMedication(index, "durationType", value)}
                                >
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

                          <div className="space-y-2 mt-4">
                            <Label>Instructions</Label>
                            <Textarea
                              value={med.instructions}
                              onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                              placeholder="Enter special instructions..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="rounded-md border p-4 text-center text-muted-foreground">
                  No medications selected. Please select at least one medication.
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Prescription Notes</Label>
                <Textarea placeholder="Enter any additional notes or instructions..." className="min-h-[80px]" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="print" />
                <Label htmlFor="print">Print prescription</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="notify-pharmacy" />
                <Label htmlFor="notify-pharmacy">Send electronically to pharmacy</Label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handlePrescribe} disabled={prescribing || selectedMedications.length === 0}>
                {prescribing ? (
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
                    Prescribing...
                  </>
                ) : (
                  <>
                    <Pill className="mr-2 h-4 w-4" />
                    Prescribe Medication
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
