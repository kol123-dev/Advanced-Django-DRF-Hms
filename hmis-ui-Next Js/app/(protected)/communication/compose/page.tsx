import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Paperclip } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ComposeMessagePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/communication">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Compose New Message</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Message Details</CardTitle>
          <CardDescription>Compose a new message to staff or patients</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="message-type">Message Type</Label>
              <RadioGroup defaultValue="internal" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="internal" id="message-type-internal" />
                  <Label htmlFor="message-type-internal">Internal Message</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="message-type-email" />
                  <Label htmlFor="message-type-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="message-type-sms" />
                  <Label htmlFor="message-type-sms">SMS</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="recipient-type">Recipient Type</Label>
                <Select>
                  <SelectTrigger id="recipient-type">
                    <SelectValue placeholder="Select recipient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="role">Role</SelectItem>
                    <SelectItem value="all-staff">All Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select>
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-sarah-miller">Dr. Sarah Miller</SelectItem>
                    <SelectItem value="dr-james-wilson">Dr. James Wilson</SelectItem>
                    <SelectItem value="nurse-robert-brown">Nurse Robert Brown</SelectItem>
                    <SelectItem value="dr-emily-rodriguez">Dr. Emily Rodriguez</SelectItem>
                    <SelectItem value="admin-lisa-johnson">Admin Lisa Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message here" className="min-h-[200px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" type="button">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Add Attachment
                </Button>
                <span className="text-sm text-muted-foreground">No file selected</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="request-read-receipt" />
                <Label htmlFor="request-read-receipt">Request read receipt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mark-urgent" />
                <Label htmlFor="mark-urgent">Mark as urgent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="save-draft" defaultChecked />
                <Label htmlFor="save-draft">Save as draft if not sent</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save as Draft</Button>
          <div className="flex gap-2">
            <Button variant="outline">Schedule</Button>
            <Button>Send Message</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
