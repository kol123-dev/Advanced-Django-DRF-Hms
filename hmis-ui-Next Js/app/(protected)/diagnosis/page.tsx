import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { DiagnosisTable } from "@/components/diagnosis-table"
import { DiagnosisStatsCards } from "@/components/diagnosis-stats-cards"
import { DiagnosisChart } from "@/components/diagnosis-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DiagnosisPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Diagnosis Management</h1>
        <Link href="/diagnosis/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Diagnosis
          </Button>
        </Link>
      </div>

      <DiagnosisStatsCards />

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Diagnosis Trends</CardTitle>
            <CardDescription>Monthly diagnosis counts by category</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DiagnosisChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Top Diagnoses</CardTitle>
            <CardDescription>Most common diagnoses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Hypertension</span>
                  <span className="text-xs text-muted-foreground">Cardiovascular</span>
                </div>
                <span className="font-medium">24%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Type 2 Diabetes</span>
                  <span className="text-xs text-muted-foreground">Endocrine</span>
                </div>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Acute Bronchitis</span>
                  <span className="text-xs text-muted-foreground">Respiratory</span>
                </div>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Anxiety Disorder</span>
                  <span className="text-xs text-muted-foreground">Psychiatric</span>
                </div>
                <span className="font-medium">9%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Osteoarthritis</span>
                  <span className="text-xs text-muted-foreground">Musculoskeletal</span>
                </div>
                <span className="font-medium">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Records</CardTitle>
          <CardDescription>View and manage all patient diagnoses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Diagnoses</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  <TabsTrigger value="chronic">Chronic</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search diagnoses..." className="w-full pl-8 bg-background" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                      <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                      <SelectItem value="neurological">Neurological</SelectItem>
                      <SelectItem value="musculoskeletal">Musculoskeletal</SelectItem>
                      <SelectItem value="endocrine">Endocrine</SelectItem>
                      <SelectItem value="psychiatric">Psychiatric</SelectItem>
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
              <DiagnosisTable status="all" />
            </TabsContent>
            <TabsContent value="active">
              <DiagnosisTable status="active" />
            </TabsContent>
            <TabsContent value="resolved">
              <DiagnosisTable status="resolved" />
            </TabsContent>
            <TabsContent value="chronic">
              <DiagnosisTable status="chronic" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
