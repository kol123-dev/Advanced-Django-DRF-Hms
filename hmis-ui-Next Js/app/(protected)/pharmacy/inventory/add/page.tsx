import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddMedicationPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Link href="/pharmacy">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add New Medication</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Medication Details</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Information</TabsTrigger>
          <TabsTrigger value="supplier">Supplier & Pricing</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
              <CardDescription>
                Enter the basic information about the medication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Medication Name</Label>
                  <Input id="name" placeholder="Enter medication name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generic-name">Generic Name</Label>
                  <Input id="generic-name" placeholder="Enter generic name" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="antibiotic">Antibiotic</SelectItem>
                      <SelectItem value="analgesic">Analgesic</SelectItem>
                      <SelectItem value="antihypertensive">Antihypertensive</SelectItem>
                      <SelectItem value="antidiabetic">Antidiabetic</SelectItem>
                      <SelectItem value="antihistamine">Antihistamine</SelectItem>
                      <SelectItem value="bronchodilator">Bronchodilator</SelectItem>
                      <SelectItem value="statin">Statin</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form">Dosage Form</Label>
                  <Select>
                    <SelectTrigger id="form">
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="liquid">Liquid</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                      <SelectItem value="inhaler">Inhaler</SelectItem>
                      <SelectItem value="cream">Cream/Ointment</SelectItem>
                      <SelectItem value="patch">Patch</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strength">Strength/Dosage</Label>
                  <Input id="strength" placeholder="e.g., 500mg, 10ml" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter medication description, uses, and other relevant information"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ndc">NDC Number</Label>
                  <Input id="ndc" placeholder="National Drug Code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="controlled">Controlled Substance</Label>
                  <Select>
                    <SelectTrigger id="controlled">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Controlled</SelectItem>
                      <SelectItem value="schedule-i">Schedule I</SelectItem>
                      <SelectItem value="schedule-ii">Schedule II</SelectItem>
                      <SelectItem value="schedule-iii">Schedule III</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter medication description, uses, and other relevant information"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ndc">NDC Number</Label>
                  <Input id="ndc" placeholder="National Drug Code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="controlled">Controlled Substance</Label>
                  <Select>
                    <SelectTrigger id="controlled">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Controlled</SelectItem>
                      <SelectItem value="schedule-i">Schedule I</SelectItem>
                      <SelectItem value="schedule-ii">Schedule II</SelectItem>
                      <SelectItem value="schedule-iii">Schedule III</SelectItem>
                    </SelectContent>
                  </Select>
\
