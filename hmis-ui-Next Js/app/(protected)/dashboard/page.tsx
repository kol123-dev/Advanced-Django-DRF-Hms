"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsChart } from "@/components/stats-chart"
import { LabTestsChart } from "@/components/lab-tests-chart"
import { PharmacyInventoryChart } from "@/components/pharmacy-inventory-chart"
import { PharmacyDispensingChart } from "@/components/pharmacy-dispensing-chart"
import { DiagnosisChart } from "@/components/diagnosis-chart"
import { PrescriptionsChart } from "@/components/prescriptions-chart"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardPage() {
  const isMobile = useMobile()

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsChart />
            <LabTestsChart />
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiagnosisChart />
            <PrescriptionsChart />
          </div>
        </TabsContent>

        <TabsContent value="pharmacy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PharmacyInventoryChart />
            <PharmacyDispensingChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
