"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMobile } from "@/hooks/use-mobile"
import { ResponsiveChart } from "@/components/responsive-chart"
import { ChartTooltip } from "@/components/chart-tooltip"
import { MobileChartCard } from "@/components/mobile-chart-card"
import { ChartLegend } from "@/components/chart-legend"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, BarChart3 } from "lucide-react"

const data = [
  { name: "Jan", hematology: 65, biochemistry: 42, microbiology: 25, immunology: 18 },
  { name: "Feb", hematology: 59, biochemistry: 38, microbiology: 30, immunology: 20 },
  { name: "Mar", hematology: 80, biochemistry: 55, microbiology: 40, immunology: 25 },
  { name: "Apr", hematology: 81, biochemistry: 56, microbiology: 35, immunology: 22 },
  { name: "May", hematology: 56, biochemistry: 40, microbiology: 30, immunology: 18 },
  { name: "Jun", hematology: 55, biochemistry: 45, microbiology: 35, immunology: 20 },
  { name: "Jul", hematology: 40, biochemistry: 30, microbiology: 25, immunology: 15 },
]

// Mobile-optimized simplified data (fewer data points)
const mobileData = [
  { name: "Jan", hematology: 65, biochemistry: 42, microbiology: 25, immunology: 18 },
  { name: "Mar", hematology: 80, biochemistry: 55, microbiology: 40, immunology: 25 },
  { name: "May", hematology: 56, biochemistry: 40, microbiology: 30, immunology: 18 },
  { name: "Jul", hematology: 40, biochemistry: 30, microbiology: 25, immunology: 15 },
]

export function LabTestsChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>(["hematology", "biochemistry", "microbiology", "immunology"])
  const [chartData, setChartData] = useState(data)

  // Update chart data based on screen size
  useEffect(() => {
    setChartData(isMobile ? mobileData : data)
  }, [isMobile])

  // Toggle data series visibility
  const toggleDataKey = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key))
    } else {
      setActiveKeys([...activeKeys, key])
    }
  }

  const legendData = [
    { name: "Hematology", color: "#10b981" },
    { name: "Biochemistry", color: "#6366f1" },
    { name: "Microbiology", color: "#f59e0b" },
    { name: "Immunology", color: "#ef4444" },
  ]

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <BarChart3 className="h-4 w-4" />
    </Button>
  )

  return (
    <MobileChartCard title="Lab Tests" description="Monthly test volume by department" action={chartAction}>
      <ResponsiveChart
        height={isMobile ? 220 : 300}
        fallback={
          <div className="p-4 flex flex-col space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col border-b pb-2">
                <div className="font-medium text-sm mb-1">{item.name}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Hema:</span>
                    <span>{item.hematology}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Bio:</span>
                    <span>{item.biochemistry}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Micro:</span>
                    <span>{item.microbiology}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Immuno:</span>
                    <span>{item.immunology}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              View as Chart
            </Button>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: isMobile ? 5 : 20,
              left: isMobile ? 0 : 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isMobile ? "#f0f0f0" : "#e0e0e0"} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickMargin={isMobile ? 5 : 10}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 25 : 40}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
              tickFormatter={(value) => (isMobile ? `${value}` : `${value}`)}
            />
            <Tooltip content={<ChartTooltip />} />
            {!isMobile && <Legend />}
            {activeKeys.includes("hematology") && (
              <Line
                type="monotone"
                dataKey="hematology"
                name="Hematology"
                stroke="#10b981"
                strokeWidth={2}
                activeDot={{ r: isMobile ? 6 : 8 }}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("biochemistry") && (
              <Line
                type="monotone"
                dataKey="biochemistry"
                name="Biochemistry"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("microbiology") && (
              <Line
                type="monotone"
                dataKey="microbiology"
                name="Microbiology"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("immunology") && (
              <Line
                type="monotone"
                dataKey="immunology"
                name="Immunology"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ResponsiveChart>
      {isMobile && (
        <div className="px-4 pb-3 pt-1">
          <ChartLegend
            data={legendData}
            onClick={(name) => toggleDataKey(name.toLowerCase())}
            activeItems={activeKeys.map((k) => k.charAt(0).toUpperCase() + k.slice(1))}
          />
        </div>
      )}
    </MobileChartCard>
  )
}
