import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, FileText, AlertTriangle, DollarSign } from "lucide-react"

export function PharmacyStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Medications</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,284</div>
          <p className="text-xs text-muted-foreground">+42 added this month</p>
          <div className="mt-4 h-1 w-full rounded-full bg-secondary">
            <div className="h-1 w-[75%] rounded-full bg-primary"></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">75% of inventory capacity</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prescriptions Filled</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">387</div>
          <div className="flex items-center text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            <span>+12.5% from last week</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <div>
              <p className="text-muted-foreground">Today</p>
              <p className="font-medium">42</p>
            </div>
            <div>
              <p className="text-muted-foreground">This Week</p>
              <p className="font-medium">214</p>
            </div>
            <div>
              <p className="text-muted-foreground">This Month</p>
              <p className="font-medium">387</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center text-xs text-red-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            <span>+8 since last check</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md bg-amber-50 p-2">
              <p className="font-medium text-amber-900">Critical: 7</p>
              <p className="text-amber-700">Needs immediate order</p>
            </div>
            <div className="rounded-md bg-blue-50 p-2">
              <p className="font-medium text-blue-900">Warning: 17</p>
              <p className="text-blue-700">Order within 7 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$24,389</div>
          <div className="flex items-center text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3" />
            <span>+4.3% from last month</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Insurance</span>
              <span>$18,492</span>
            </div>
            <div className="mt-1 h-1 w-full rounded-full bg-secondary">
              <div className="h-1 w-[76%] rounded-full bg-green-500"></div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Out-of-pocket</span>
              <span>$5,897</span>
            </div>
            <div className="mt-1 h-1 w-full rounded-full bg-secondary">
              <div className="h-1 w-[24%] rounded-full bg-blue-500"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
