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
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskRoundIcon as Flask, CheckCircle2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface OrderLabTestsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
}

export function OrderLabTestsModal({ open, onOpenChange, patientName }: OrderLabTestsModalProps) {
  const [ordering, setOrdering] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  const labTests = [
    { id: "cbc", name: "Complete Blood Count (CBC)", category: "Hematology" },
    { id: "bmp", name: "Basic Metabolic Panel", category: "Chemistry" },
    { id: "cmp", name: "Comprehensive Metabolic Panel", category: "Chemistry" },
    { id: "lipid", name: "Lipid Panel", category: "Chemistry" },
    { id: "thyroid", name: "Thyroid Function Tests", category: "Endocrinology" },
    { id: "hba1c", name: "Hemoglobin A1C", category: "Endocrinology" },
    { id: "urinalysis", name: "Urinalysis", category: "Urology" },
    { id: "troponin", name: "Troponin", category: "Cardiac" },
    { id: "bnp", name: "B-type Natriuretic Peptide (BNP)", category: "Cardiac" },
    { id: "pt", name: "Prothrombin Time (PT)", category: "Coagulation" },
    { id: "ptt", name: "Partial Thromboplastin Time (PTT)", category: "Coagulation" },
    { id: "d-dimer", name: "D-dimer", category: "Coagulation" },
    { id: "crp", name: "C-Reactive Protein", category: "Inflammation" },
    { id: "esr", name: "Erythrocyte Sedimentation Rate", category: "Inflammation" },
  ]

  const filteredTests = labTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleTestSelection = (testId: string) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((id) => id !== testId))
    } else {
      setSelectedTests([...selectedTests, testId])
    }
  }

  const handleOrder = () => {
    setOrdering(true)
    // Simulate API call
    setTimeout(() => {
      setOrdering(false)
      setOrdered(true)
      setTimeout(() => {
        setOrdered(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Order Lab Tests</DialogTitle>
          <DialogDescription>Order laboratory tests for {patientName}</DialogDescription>
        </DialogHeader>
        {ordered ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Lab Tests Ordered</h3>
            <p className="text-sm text-muted-foreground text-center">
              {selectedTests.length} test(s) have been ordered successfully.
            </p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Tests</TabsTrigger>
                <TabsTrigger value="common">Common Panels</TabsTrigger>
                <TabsTrigger value="recent">Recently Ordered</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search tests by name or category..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hematology">Hematology</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="cardiac">Cardiac</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="coagulation">Coagulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[300px] rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                            No tests found matching your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTests.map((test) => (
                          <TableRow key={test.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <Checkbox
                                checked={selectedTests.includes(test.id)}
                                onCheckedChange={() => toggleTestSelection(test.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{test.name}</TableCell>
                            <TableCell>{test.category}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="common" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`rounded-lg border p-4 cursor-pointer hover:bg-muted/50 ${
                      selectedTests.includes("cbc") && selectedTests.includes("bmp") ? "border-primary" : ""
                    }`}
                    onClick={() => {
                      if (selectedTests.includes("cbc") && selectedTests.includes("bmp")) {
                        setSelectedTests(selectedTests.filter((id) => id !== "cbc" && id !== "bmp"))
                      } else {
                        setSelectedTests([...new Set([...selectedTests, "cbc", "bmp"])])
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Basic Health Panel</h4>
                        <p className="text-sm text-muted-foreground">Standard panel for general health assessment</p>
                      </div>
                      <Checkbox
                        checked={selectedTests.includes("cbc") && selectedTests.includes("bmp")}
                        className="mt-1"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="outline">CBC</Badge>
                      <Badge variant="outline">Basic Metabolic Panel</Badge>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border p-4 cursor-pointer hover:bg-muted/50 ${
                      selectedTests.includes("lipid") && selectedTests.includes("hba1c") ? "border-primary" : ""
                    }`}
                    onClick={() => {
                      if (selectedTests.includes("lipid") && selectedTests.includes("hba1c")) {
                        setSelectedTests(selectedTests.filter((id) => id !== "lipid" && id !== "hba1c"))
                      } else {
                        setSelectedTests([...new Set([...selectedTests, "lipid", "hba1c"])])
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Diabetes & Cholesterol Panel</h4>
                        <p className="text-sm text-muted-foreground">Comprehensive metabolic assessment</p>
                      </div>
                      <Checkbox
                        checked={selectedTests.includes("lipid") && selectedTests.includes("hba1c")}
                        className="mt-1"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="outline">Lipid Panel</Badge>
                      <Badge variant="outline">HbA1c</Badge>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border p-4 cursor-pointer hover:bg-muted/50 ${
                      selectedTests.includes("troponin") && selectedTests.includes("bnp") ? "border-primary" : ""
                    }`}
                    onClick={() => {
                      if (selectedTests.includes("troponin") && selectedTests.includes("bnp")) {
                        setSelectedTests(selectedTests.filter((id) => id !== "troponin" && id !== "bnp"))
                      } else {
                        setSelectedTests([...new Set([...selectedTests, "troponin", "bnp"])])
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Cardiac Panel</h4>
                        <p className="text-sm text-muted-foreground">Assessment for cardiac conditions</p>
                      </div>
                      <Checkbox
                        checked={selectedTests.includes("troponin") && selectedTests.includes("bnp")}
                        className="mt-1"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="outline">Troponin</Badge>
                      <Badge variant="outline">BNP</Badge>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border p-4 cursor-pointer hover:bg-muted/50 ${
                      selectedTests.includes("pt") && selectedTests.includes("ptt") && selectedTests.includes("d-dimer")
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        selectedTests.includes("pt") &&
                        selectedTests.includes("ptt") &&
                        selectedTests.includes("d-dimer")
                      ) {
                        setSelectedTests(selectedTests.filter((id) => id !== "pt" && id !== "ptt" && id !== "d-dimer"))
                      } else {
                        setSelectedTests([...new Set([...selectedTests, "pt", "ptt", "d-dimer"])])
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Coagulation Panel</h4>
                        <p className="text-sm text-muted-foreground">Assessment for bleeding/clotting disorders</p>
                      </div>
                      <Checkbox
                        checked={
                          selectedTests.includes("pt") &&
                          selectedTests.includes("ptt") &&
                          selectedTests.includes("d-dimer")
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="outline">PT</Badge>
                      <Badge variant="outline">PTT</Badge>
                      <Badge variant="outline">D-dimer</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 pt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Last Ordered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedTests.includes("cbc")}
                            onCheckedChange={() => toggleTestSelection("cbc")}
                          />
                        </TableCell>
                        <TableCell className="font-medium">Complete Blood Count (CBC)</TableCell>
                        <TableCell>2 days ago</TableCell>
                      </TableRow>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedTests.includes("lipid")}
                            onCheckedChange={() => toggleTestSelection("lipid")}
                          />
                        </TableCell>
                        <TableCell className="font-medium">Lipid Panel</TableCell>
                        <TableCell>1 week ago</TableCell>
                      </TableRow>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedTests.includes("troponin")}
                            onCheckedChange={() => toggleTestSelection("troponin")}
                          />
                        </TableCell>
                        <TableCell className="font-medium">Troponin</TableCell>
                        <TableCell>3 days ago</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label>Selected Tests ({selectedTests.length})</Label>
                {selectedTests.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setSelectedTests([])}>
                    Clear All
                  </Button>
                )}
              </div>

              {selectedTests.length > 0 ? (
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedTests.map((testId) => {
                      const test = labTests.find((t) => t.id === testId)
                      return (
                        <Badge key={testId} variant="secondary" className="flex items-center gap-1">
                          {test?.name}
                          <button
                            className="ml-1 rounded-full hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTestSelection(testId)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                            <span className="sr-only">Remove</span>
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <div className="rounded-md border p-4 text-center text-muted-foreground">
                  No tests selected. Please select at least one test.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue="routine">
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

                <div className="space-y-2">
                  <Label>Collection Type</Label>
                  <Select defaultValue="venipuncture">
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venipuncture">Venipuncture</SelectItem>
                      <SelectItem value="fingerstick">Fingerstick</SelectItem>
                      <SelectItem value="urine">Urine Sample</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinical-info">Clinical Information</Label>
                <Textarea
                  id="clinical-info"
                  placeholder="Enter relevant clinical information or special instructions..."
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleOrder} disabled={ordering || selectedTests.length === 0}>
                {ordering ? (
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
                    Ordering...
                  </>
                ) : (
                  <>
                    <Flask className="mr-2 h-4 w-4" />
                    Order Tests
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
