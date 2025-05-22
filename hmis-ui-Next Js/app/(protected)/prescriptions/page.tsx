import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { PrescriptionsTable } from "@/components/prescriptions-table"
import { PrescriptionsStatsCards } from "@/components/prescriptions-stats-cards"
import { PrescriptionsChart } from "@/components/prescriptions-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PrescriptionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Prescriptions Management</h1>
        <Link href="/prescriptions/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </Link>
      </div>

      <PrescriptionsStatsCards />

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Prescription Trends</CardTitle>
            <CardDescription>Monthly prescription counts by category</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <PrescriptionsChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Top Medications</CardTitle>
            <CardDescription>Most prescribed medications this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Lisinopril</span>
                  <span className="text-xs text-muted-foreground">Antihypertensive</span>
                </div>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Metformin</span>
                  <span className="text-xs text-muted-foreground">Antidiabetic</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Amoxicillin</span>
                  <span className="text-xs text-muted-foreground">Antibiotic</span>
                </div>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Atorvastatin</span>
                  <span className="text-xs text-muted-foreground">Statin</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Levothyroxine</span>
                  <span className="text-xs text-muted-foreground">Thyroid Hormone</span>
                </div>
                <span className="font-medium">8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescription Records</CardTitle>
          <CardDescription>View and manage all patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Prescriptions</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="refill">Needs Refill</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search prescriptions..." className="w-full pl-8 bg-background" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="antibiotics">Antibiotics</SelectItem>
                      <SelectItem value="antihypertensives">Antihypertensives</SelectItem>
                      <SelectItem value="antidiabetics">Antidiabetics</SelectItem>
                      <SelectItem value="analgesics">Analgesics</SelectItem>
                      <SelectItem value="statins">Statins</SelectItem>
                      <SelectItem value="antidepressants">Antidepressants</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="all">
              <PrescriptionsTable status="all" />
            </TabsContent>
            <TabsContent value="active">
              <PrescriptionsTable status="active" />
            </TabsContent>
            <TabsContent value="completed">
              <PrescriptionsTable status="completed" />
            </TabsContent>
            <TabsContent value="refill">
              <PrescriptionsTable status="refill" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
