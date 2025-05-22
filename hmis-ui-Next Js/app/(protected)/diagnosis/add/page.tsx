import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AddDiagnosisPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Link href="/diagnosis">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Diagnosis</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Information</CardTitle>
          <CardDescription>Enter details for the new diagnosis</CardDescription>
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
                <Label htmlFor="diagnosis-category">Diagnosis Category</Label>
                <Select>
                  <SelectTrigger id="diagnosis-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                    <SelectItem value="respiratory">Respiratory</SelectItem>
                    <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                    <SelectItem value="neurological">Neurological</SelectItem>
                    <SelectItem value="musculoskeletal">Musculoskeletal</SelectItem>
                    <SelectItem value="endocrine">Endocrine</SelectItem>
                    <SelectItem value="psychiatric">Psychiatric</SelectItem>
                    <SelectItem value="ent">ENT</SelectItem>
                    <SelectItem value="dermatological">Dermatological</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis-name">Diagnosis Name</Label>
                <Input id="diagnosis-name" placeholder="Enter diagnosis name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icd-code">ICD-10 Code</Label>
                <Input id="icd-code" placeholder="Enter ICD-10 code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosed-by">Diagnosed By</Label>
                <Select>
                  <SelectTrigger id="diagnosed-by">
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
                <Label htmlFor="diagnosis-date">Diagnosis Date</Label>
                <Input id="diagnosis-date" type="date" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="severity">Severity</Label>
                <RadioGroup defaultValue="moderate" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="severity-mild" />
                    <Label htmlFor="severity-mild">Mild</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="severity-moderate" />
                    <Label htmlFor="severity-moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="severity-severe" />
                    <Label htmlFor="severity-severe">Severe</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="status">Status</Label>
                <RadioGroup defaultValue="active" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="status-active" />
                    <Label htmlFor="status-active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chronic" id="status-chronic" />
                    <Label htmlFor="status-chronic">Chronic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="resolved" id="status-resolved" />
                    <Label htmlFor="status-resolved">Resolved</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea id="symptoms" placeholder="Enter patient symptoms" className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Clinical Notes</Label>
              <Textarea id="notes" placeholder="Enter clinical notes and observations" className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatment-plan">Treatment Plan</Label>
              <Textarea id="treatment-plan" placeholder="Enter initial treatment plan" className="min-h-[100px]" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Diagnosis</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
