import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function DispenseMedicationPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Link href="/pharmacy">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispense Medication</h1>
          <p className="text-muted-foreground">Process and dispense prescription medications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
            <CardDescription>Enter prescription information or scan barcode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="prescription-id">Prescription ID</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="prescription-id" placeholder="Enter or scan ID" />
                  <Button variant="outline">Scan</Button>
                </div>
              </div>
              <div className="flex-1">
                <Label htmlFor="prescription-date">Prescription Date</Label>
                <Input id="prescription-date" type="date" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input id="patient-id" placeholder="Enter patient ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input id="patient-name" placeholder="Patient name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="doctor">Prescribing Doctor</Label>
                <Input id="doctor" placeholder="Doctor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">Medications</Label>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add Medication
                </Button>
              </div>

              <div className="space-y-4">
                {/* Medication Item 1 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="medication-1">Medication</Label>
                        <Select>
                          <SelectTrigger id="medication-1">
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amoxicillin">Amoxicillin 500mg</SelectItem>
                            <SelectItem value="lisinopril">Lisinopril 10mg</SelectItem>
                            <SelectItem value="metformin">Metformin 500mg</SelectItem>
                            <SelectItem value="atorvastatin">Atorvastatin 20mg</SelectItem>
                            <SelectItem value="omeprazole">Omeprazole 20mg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:w-24 space-y-2">
                        <Label htmlFor="quantity-1">Quantity</Label>
                        <Input id="quantity-1" type="number" defaultValue="30" />
                      </div>
                      <div className="md:w-24 space-y-2">
                        <Label htmlFor="days-1">Days</Label>
                        <Input id="days-1" type="number" defaultValue="10" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="instructions-1">Instructions</Label>
                      <Input id="instructions-1" placeholder="e.g., Take 1 tablet 3 times daily after meals" />
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="batch-1">Batch Number</Label>
                        <Input id="batch-1" placeholder="Batch number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-1">Expiry Date</Label>
                        <Input id="expiry-1" type="date" />
                      </div>
                      <div className="flex items-center pt-8">
                        <Badge variant="outline" className="ml-2">
                          In Stock: 230
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medication Item 2 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="medication-2">Medication</Label>
                        <Select>
                          <SelectTrigger id="medication-2">
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amoxicillin">Amoxicillin 500mg</SelectItem>
                            <SelectItem value="lisinopril">Lisinopril 10mg</SelectItem>
                            <SelectItem value="metformin">Metformin 500mg</SelectItem>
                            <SelectItem value="atorvastatin">Atorvastatin 20mg</SelectItem>
                            <SelectItem value="omeprazole">Omeprazole 20mg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:w-24 space-y-2">
                        <Label htmlFor="quantity-2">Quantity</Label>
                        <Input id="quantity-2" type="number" defaultValue="60" />
                      </div>
                      <div className="md:w-24 space-y-2">
                        <Label htmlFor="days-2">Days</Label>
                        <Input id="days-2" type="number" defaultValue="30" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="instructions-2">Instructions</Label>
                      <Input id="instructions-2" placeholder="e.g., Take 1 tablet twice daily" />
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="batch-2">Batch Number</Label>
                        <Input id="batch-2" placeholder="Batch number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-2">Expiry Date</Label>
                        <Input id="expiry-2" type="date" />
                      </div>
                      <div className="flex items-center pt-8">
                        <Badge variant="secondary" className="ml-2">
                          Low Stock: 45
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="notes">Pharmacist Notes</Label>
              <Textarea id="notes" placeholder="Enter any notes or special instructions" rows={2} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/pharmacy">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Dispensing
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div>Maria Garcia</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Patient ID</div>
                <div>P10045</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Date of Birth</div>
                <div>05/12/1985</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Gender</div>
                <div>Female</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Contact</div>
                <div>+1 (555) 123-4567</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Allergies</div>
                <div className="text-red-500">Penicillin, Sulfa drugs</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Chronic Conditions</div>
                <div>Hypertension, Type 2 Diabetes</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="check-stock" />
                <Label htmlFor="check-stock">Stock verified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-interactions" />
                <Label htmlFor="check-interactions">Drug interactions checked</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-allergies" />
                <Label htmlFor="check-allergies">Allergies verified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-dosage" />
                <Label htmlFor="check-dosage">Dosage verified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-instructions" />
                <Label htmlFor="check-instructions">Instructions verified</Label>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="pharmacist">Dispensing Pharmacist</Label>
                <Select>
                  <SelectTrigger id="pharmacist">
                    <SelectValue placeholder="Select pharmacist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe, RPh</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith, PharmD</SelectItem>
                    <SelectItem value="robert-johnson">Robert Johnson, RPh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input id="insurance" placeholder="Enter insurance provider" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policy-number">Policy Number</Label>
                <Input id="policy-number" placeholder="Enter policy number" />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div className="font-medium">Subtotal:</div>
                <div>$78.50</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Insurance Coverage:</div>
                <div>-$65.00</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium">Patient Copay:</div>
                <div className="font-bold">$13.50</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
