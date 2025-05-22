import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Calendar, ChevronUp, DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react"
import { AppointmentList } from "@/components/appointment-list"
import { QueueManagementWidget } from "@/components/queue-management-widget"
import { StatsChart } from "@/components/stats-chart"
import { ResponsiveContainer } from "@/components/responsive-container"
import { RecentPatients } from "@/components/recent-patients"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <ResponsiveContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Johnson. Here's your hospital overview.</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,853</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <ChevronUp className="h-3 w-3 mr-1" /> 18%
                </span>
                <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Calendar className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <ChevronUp className="h-3 w-3 mr-1" /> 5%
                </span>
                <span className="text-xs text-muted-foreground ml-1.5">from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="rounded-full bg-violet-100 p-2 text-violet-600">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,563</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <ChevronUp className="h-3 w-3 mr-1" /> 12%
                </span>
                <span className="text-xs text-muted-foreground ml-1.5">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <Activity className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <div className="flex items-center pt-1">
                <span className="text-xs font-medium text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" /> 2%
                </span>
                <span className="text-xs text-muted-foreground ml-1.5">from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="border-b">
            <TabsList className="flex w-full overflow-x-auto no-scrollbar justify-start h-12 bg-transparent space-x-2">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-background data-[state=active]:shadow">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-background data-[state=active]:shadow">
                Reports
              </TabsTrigger>
              <TabsTrigger value="patients" className="data-[state=active]:bg-background data-[state=active]:shadow">
                Patients
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Hospital Statistics</CardTitle>
                    <CardDescription>Patient admissions and discharges for the current month</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      May 2025
                    </Button>
                    <Button variant="secondary" size="sm">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <StatsChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Queue Management</CardTitle>
                  <CardDescription>Current waiting status by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <QueueManagementWidget />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Appointments scheduled for today</CardDescription>
                  </div>
                  <Link href="/appointments">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="overflow-auto p-0">
                  <AppointmentList limit={5} />
                </CardContent>
              </Card>

              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Latest patient activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentPatients />
                </CardContent>
                <div className="px-6 py-3 border-t">
                  <Link href="/patients">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      View all patients
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </CardContent>
                <div className="px-6 py-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full justify-center text-red-500">
                    View alerts
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Surgery Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Surgeries scheduled today</p>
                </CardContent>
                <div className="px-6 py-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full justify-center">
                    View schedule
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </CardContent>
                <div className="px-6 py-3 border-t">
                  <Link href="/lab">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      Review results
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Current shift</p>
                </CardContent>
                <div className="px-6 py-3 border-t">
                  <Link href="/staff">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      View staff
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed hospital performance analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Analytics dashboard content</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view hospital reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Reports dashboard content</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
                <CardDescription>Patient statistics and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Patient dashboard content</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveContainer>
  )
}
