import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { LabTestsTable } from "@/components/lab-tests-table"
import { LabStatsCards } from "@/components/lab-stats-cards"
import { LabTestsChart } from "@/components/lab-tests-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LabPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Laboratory Management</h1>
        <Link href="/lab/tests/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lab Test
          </Button>
        </Link>
      </div>

      <LabStatsCards />

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Lab Tests Overview</CardTitle>
            <CardDescription>Monthly test volume by category</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <LabTestsChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Test Categories</CardTitle>
            <CardDescription>Distribution of tests by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Hematology</span>
                  <span className="text-xs text-muted-foreground">Blood tests, CBC, etc.</span>
                </div>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Biochemistry</span>
                  <span className="text-xs text-muted-foreground">Liver function, kidney function</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Microbiology</span>
                  <span className="text-xs text-muted-foreground">Cultures, sensitivity</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Immunology</span>
                  <span className="text-xs text-muted-foreground">Antibody tests, allergen tests</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">Others</span>
                  <span className="text-xs text-muted-foreground">Specialized tests</span>
                </div>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lab Tests Management</CardTitle>
          <CardDescription>View and manage all laboratory tests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Tests</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search tests..." className="w-full pl-8 bg-background" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hematology">Hematology</SelectItem>
                      <SelectItem value="biochemistry">Biochemistry</SelectItem>
                      <SelectItem value="microbiology">Microbiology</SelectItem>
                      <SelectItem value="immunology">Immunology</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
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
              <LabTestsTable status="all" />
            </TabsContent>
            <TabsContent value="pending">
              <LabTestsTable status="pending" />
            </TabsContent>
            <TabsContent value="in-progress">
              <LabTestsTable status="in-progress" />
            </TabsContent>
            <TabsContent value="completed">
              <LabTestsTable status="completed" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
