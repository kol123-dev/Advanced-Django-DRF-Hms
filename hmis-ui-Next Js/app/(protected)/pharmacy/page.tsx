import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText, Settings, TrendingUp, Package, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { PharmacyStatsCards } from "@/components/pharmacy-stats-cards"
import { PharmacyInventoryTable } from "@/components/pharmacy-inventory-table"
import { PharmacyPrescriptionsTable } from "@/components/pharmacy-prescriptions-table"
import { PharmacyDispensingQueue } from "@/components/pharmacy-dispensing-queue"
import { PharmacyExpiryAlerts } from "@/components/pharmacy-expiry-alerts"
import { PharmacyLowStockAlerts } from "@/components/pharmacy-low-stock-alerts"
import { PharmacyInventoryChart } from "@/components/pharmacy-inventory-chart"
import { PharmacyDispensingChart } from "@/components/pharmacy-dispensing-chart"

export default function PharmacyPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Management</h1>
          <p className="text-muted-foreground">Manage medication inventory, prescriptions, and pharmacy operations</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search medications..."
              className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
          <div className="flex gap-2">
            <Link href="/pharmacy/inventory/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <PharmacyStatsCards />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current medication stock levels and trends</CardDescription>
            </div>
            <Link href="/pharmacy/inventory">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PharmacyInventoryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Dispensing Activity</CardTitle>
              <CardDescription>Medication dispensing trends</CardDescription>
            </div>
            <Link href="/pharmacy/reports">
              <Button variant="outline" size="sm">
                Reports
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PharmacyDispensingChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Critical inventory notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="expiry">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expiry">Expiry</TabsTrigger>
                <TabsTrigger value="stock">Low Stock</TabsTrigger>
              </TabsList>
              <TabsContent value="expiry" className="mt-4">
                <PharmacyExpiryAlerts />
              </TabsContent>
              <TabsContent value="stock" className="mt-4">
                <PharmacyLowStockAlerts />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Dispensing Queue</CardTitle>
            <CardDescription>Prescriptions waiting to be dispensed</CardDescription>
          </CardHeader>
          <CardContent>
            <PharmacyDispensingQueue />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="inventory" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Link href="/pharmacy/suppliers">
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Suppliers
                </Button>
              </Link>
              <Link href="/pharmacy/reports">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </Link>
              <Link href="/pharmacy/settings">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Medication Inventory</CardTitle>
                  <CardDescription>Manage your pharmacy stock</CardDescription>
                </div>
                <Link href="/pharmacy/inventory/add">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <PharmacyInventoryTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Prescriptions</CardTitle>
                  <CardDescription>Manage and dispense patient prescriptions</CardDescription>
                </div>
                <Link href="/pharmacy/prescriptions/dispense">
                  <Button size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    Dispense Medication
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <PharmacyPrescriptionsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common pharmacy tasks</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/pharmacy/inventory/add">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Add New Medication
                </Button>
              </Link>
              <Link href="/pharmacy/prescriptions/dispense">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Dispense Medication
                </Button>
              </Link>
              <Link href="/pharmacy/suppliers/add">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </Link>
              <Link href="/pharmacy/reports">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Expected medication shipments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? "Today" : i === 2 ? "Tomorrow" : "May 15, 2025"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{i * 5} items</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? "MedSupply Inc." : i === 2 ? "PharmaWholesale" : "Global Meds Ltd."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
