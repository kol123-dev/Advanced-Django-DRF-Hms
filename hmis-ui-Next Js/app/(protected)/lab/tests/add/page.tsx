import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AddLabTestPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/lab">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Request New Lab Test</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Test Information</CardTitle>
          <CardDescription>Enter details for the new laboratory test</CardDescription>
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
                <Label htmlFor="test-category">Test Category</Label>
                <Select>
                  <SelectTrigger id="test-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hematology">Hematology</SelectItem>
                    <SelectItem value="biochemistry">Biochemistry</SelectItem>
                    <SelectItem value="microbiology">Microbiology</SelectItem>
                    <SelectItem value="immunology">Immunology</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-type">Test Type</Label>
                <Select>
                  <SelectTrigger id="test-type">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                    <SelectItem value="lft">Liver Function Test</SelectItem>
                    <SelectItem value="rft">Renal Function Test</SelectItem>
                    <SelectItem value="lipid">Lipid Profile</SelectItem>
                    <SelectItem value="thyroid">Thyroid Function Test</SelectItem>
                    <SelectItem value="urinalysis">Urinalysis</SelectItem>
                    <SelectItem value="blood-culture">Blood Culture</SelectItem>
                    <SelectItem value="hba1c">HbA1c</SelectItem>
                    <SelectItem value="custom">Custom Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-test-name">Custom Test Name</Label>
                <Input id="custom-test-name" placeholder="Enter custom test name if applicable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requested-by">Requested By</Label>
                <Select>
                  <SelectTrigger id="requested-by">
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
                <Label htmlFor="request-date">Request Date</Label>
                <Input id="request-date" type="date" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="priority">Priority</Label>
                <RadioGroup defaultValue="routine" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="routine" id="priority-routine" />
                    <Label htmlFor="priority-routine">Routine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="priority-urgent" />
                    <Label htmlFor="priority-urgent">Urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stat" id="priority-stat" />
                    <Label htmlFor="priority-stat">STAT</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinical-info">Clinical Information</Label>
              <Textarea
                id="clinical-info"
                placeholder="Enter relevant clinical information or diagnosis"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="special-instructions">Special Instructions</Label>
              <Textarea
                id="special-instructions"
                placeholder="Enter any special instructions for this test"
                className="min-h-[100px]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Request Test</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
