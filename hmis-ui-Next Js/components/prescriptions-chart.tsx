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
  { name: "Jan", antibiotics: 35, antihypertensives: 42, antidiabetics: 25, analgesics: 38, other: 30 },
  { name: "Feb", antibiotics: 42, antihypertensives: 45, antidiabetics: 30, analgesics: 35, other: 32 },
  { name: "Mar", antibiotics: 55, antihypertensives: 48, antidiabetics: 35, analgesics: 40, other: 35 },
  { name: "Apr", antibiotics: 40, antihypertensives: 52, antidiabetics: 38, analgesics: 42, other: 38 },
  { name: "May", antibiotics: 35, antihypertensives: 55, antidiabetics: 40, analgesics: 38, other: 32 },
  { name: "Jun", antibiotics: 30, antihypertensives: 58, antidiabetics: 42, analgesics: 35, other: 35 },
  { name: "Jul", antibiotics: 45, antihypertensives: 60, antidiabetics: 45, analgesics: 40, other: 42 },
]

// Mobile-optimized data with fewer points
const mobileData = [
  { name: "Jan", antibiotics: 35, antihypertensives: 42, antidiabetics: 25, analgesics: 38, other: 30 },
  { name: "Mar", antibiotics: 55, antihypertensives: 48, antidiabetics: 35, analgesics: 40, other: 35 },
  { name: "May", antibiotics: 35, antihypertensives: 55, antidiabetics: 40, analgesics: 38, other: 32 },
  { name: "Jul", antibiotics: 45, antihypertensives: 60, antidiabetics: 45, analgesics: 40, other: 42 },
]

export function PrescriptionsChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>([
    "antibiotics",
    "antihypertensives",
    "antidiabetics",
    "analgesics",
    "other",
  ])
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
    { name: "Antibiotics", color: "#10b981" },
    { name: "Antihypertensives", color: "#ef4444" },
    { name: "Antidiabetics", color: "#3b82f6" },
    { name: "Analgesics", color: "#f59e0b" },
    { name: "Other", color: "#8b5cf6" },
  ]

  // For mobile, we'll show a simplified version with fewer data series
  const mobileLegendData = isMobile
    ? [
        { name: "Antibiotics", color: "#10b981" },
        { name: "Anti-HTN", color: "#ef4444" },
        { name: "Other", color: "#8b5cf6" },
      ]
    : legendData

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <BarChart3 className="h-4 w-4" />
    </Button>
  )

  return (
    <MobileChartCard title="Prescription Trends" description="Monthly prescriptions by category" action={chartAction}>
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
                    <span className="text-muted-foreground mr-1">Antibio:</span>
                    <span>{item.antibiotics}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Anti-HTN:</span>
                    <span>{item.antihypertensives}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Other:</span>
                    <span>{item.other}</span>
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
            {activeKeys.includes("antibiotics") && (
              <Line
                type="monotone"
                dataKey="antibiotics"
                name="Antibiotics"
                stroke="#10b981"
                strokeWidth={2}
                activeDot={{ r: isMobile ? 6 : 8 }}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("antihypertensives") && (
              <Line
                type="monotone"
                dataKey="antihypertensives"
                name={isMobile ? "Anti-HTN" : "Antihypertensives"}
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {/* On mobile, we'll only show the most important data series to avoid clutter */}
            {!isMobile && activeKeys.includes("antidiabetics") && (
              <Line
                type="monotone"
                dataKey="antidiabetics"
                name="Antidiabetics"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}
            {!isMobile && activeKeys.includes("analgesics") && (
              <Line
                type="monotone"
                dataKey="analgesics"
                name="Analgesics"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}
            {activeKeys.includes("other") && (
              <Line
                type="monotone"
                dataKey="other"
                name="Other"
                stroke="#8b5cf6"
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
            data={mobileLegendData}
            onClick={(name) => {
              if (name === "Anti-HTN") {
                toggleDataKey("antihypertensives")
              } else {
                toggleDataKey(name.toLowerCase())
              }
            }}
            activeItems={activeKeys.map((k) => {
              if (k === "antibiotics") return "Antibiotics"
              if (k === "antihypertensives") return isMobile ? "Anti-HTN" : "Antihypertensives"
              if (k === "antidiabetics") return "Antidiabetics"
              if (k === "analgesics") return "Analgesics"
              if (k === "other") return "Other"
              return k
            })}
          />
        </div>
      )}
    </MobileChartCard>
  )
}
