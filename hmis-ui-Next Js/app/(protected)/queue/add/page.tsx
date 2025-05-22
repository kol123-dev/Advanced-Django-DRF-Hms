import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AddToQueuePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/queue">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add to Queue</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Queue Details</CardTitle>
          <CardDescription>Add a patient to the waiting queue</CardDescription>
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
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="triage">Triage</SelectItem>
                    <SelectItem value="consultation-r1">Consultation R1</SelectItem>
                    <SelectItem value="consultation-r2">Consultation R2</SelectItem>
                    <SelectItem value="lab">Lab</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="eye-clinic">Eye Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select>
                  <SelectTrigger id="doctor">
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
                <Label htmlFor="priority">Priority</Label>
                <RadioGroup defaultValue="normal" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="priority-normal" />
                    <Label htmlFor="priority-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="priority-urgent" />
                    <Label htmlFor="priority-urgent">Urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="priority-emergency" />
                    <Label htmlFor="priority-emergency">Emergency</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea id="reason" placeholder="Enter the reason for the patient's visit" className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes or special requirements"
                className="min-h-[100px]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Add to Queue</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
