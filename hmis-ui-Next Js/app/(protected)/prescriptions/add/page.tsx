import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddPrescriptionPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/prescriptions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Prescription</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Prescription Information</CardTitle>
          <CardDescription>Enter details for the new prescription</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emma-johnson">Emma Johnson</SelectItem>
                    <SelectItem value="michael-chen">Michael Chen</SelectItem>
                    <SelectItem value="sophia-williams">Sophia Williams</SelectItem>
                    <SelectItem value="robert-garcia">Robert Garcia</SelectItem>
                    <SelectItem value="olivia-brown">Olivia Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medication-category">Medication Category</Label>
                <Select>
                  <SelectTrigger id="medication-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="antihypertensives">Antihypertensives</SelectItem>
                    <SelectItem value="antidiabetics">Antidiabetics</SelectItem>
                    <SelectItem value="analgesics">Analgesics</SelectItem>
                    <SelectItem value="statins">Statins</SelectItem>
                    <SelectItem value="antidepressants">Antidepressants</SelectItem>
                    <SelectItem value="thyroid-hormones">Thyroid Hormones</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <Select>
                  <SelectTrigger id="medication">
                    <SelectValue placeholder="Select medication" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lisinopril-10mg">Lisinopril 10mg</SelectItem>
                    <SelectItem value="metformin-500mg">Metformin 500mg</SelectItem>
                    <SelectItem value="amoxicillin-500mg">Amoxicillin 500mg</SelectItem>
                    <SelectItem value="atorvastatin-20mg">Atorvastatin 20mg</SelectItem>
                    <SelectItem value="ibuprofen-400mg">Ibuprofen 400mg</SelectItem>
                    <SelectItem value="sertraline-50mg">Sertraline 50mg</SelectItem>
                    <SelectItem value="levothyroxine-75mcg">Levothyroxine 75mcg</SelectItem>
                    <SelectItem value="custom">Custom Medication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-medication">Custom Medication</Label>
                <Input id="custom-medication" placeholder="Enter custom medication name and strength" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prescribed-by">Prescribed By</Label>
                <Select>
                  <SelectTrigger id="prescribed-by">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-sarah-miller">Dr. Sarah Miller</SelectItem>
                    <SelectItem value="dr-james-wilson">Dr. James Wilson</SelectItem>
                    <SelectItem value="dr-emily-rodriguez">Dr. Emily Rodriguez</SelectItem>
                    <SelectItem value="dr-david-kim">Dr. David Kim</SelectItem>
                    <SelectItem value="dr-lisa-johnson">Dr. Lisa Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prescription-date">Prescription Date</Label>
                <Input id="prescription-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="refills">Number of Refills</Label>
                <Select>
                  <SelectTrigger id="refills">
                    <SelectValue placeholder="Select refills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g., 1 tablet twice daily" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 7 days, 1 month" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" placeholder="e.g., 30 tablets" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter detailed instructions for taking the medication"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes or warnings about the medication"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="controlled-substance" />
                <Label htmlFor="controlled-substance">This is a controlled substance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="generic-substitution" defaultChecked />
                <Label htmlFor="generic-substitution">Allow generic substitution</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Prescription</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
