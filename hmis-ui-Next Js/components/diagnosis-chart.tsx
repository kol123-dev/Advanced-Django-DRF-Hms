"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMobile } from "@/hooks/use-mobile"
import { ResponsiveChart } from "@/components/responsive-chart"
import { ChartTooltip } from "@/components/chart-tooltip"
import { MobileChartCard } from "@/components/mobile-chart-card"
import { ChartLegend } from "@/components/chart-legend"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, PieChart } from "lucide-react"

const data = [
  { name: "Jan", cardiovascular: 45, respiratory: 32, gastrointestinal: 25, neurological: 18, other: 30 },
  { name: "Feb", cardiovascular: 52, respiratory: 48, gastrointestinal: 30, neurological: 20, other: 35 },
  { name: "Mar", cardiovascular: 61, respiratory: 55, gastrointestinal: 35, neurological: 25, other: 40 },
  { name: "Apr", cardiovascular: 67, respiratory: 42, gastrointestinal: 28, neurological: 22, other: 38 },
  { name: "May", cardiovascular: 55, respiratory: 35, gastrointestinal: 32, neurological: 20, other: 32 },
  { name: "Jun", cardiovascular: 58, respiratory: 30, gastrointestinal: 35, neurological: 24, other: 35 },
  { name: "Jul", cardiovascular: 65, respiratory: 45, gastrointestinal: 40, neurological: 30, other: 42 },
]

// Mobile-optimized data with fewer points
const mobileData = [
  { name: "Jan", cardiovascular: 45, respiratory: 32, gastrointestinal: 25, neurological: 18, other: 30 },
  { name: "Mar", cardiovascular: 61, respiratory: 55, gastrointestinal: 35, neurological: 25, other: 40 },
  { name: "May", cardiovascular: 55, respiratory: 35, gastrointestinal: 32, neurological: 20, other: 32 },
  { name: "Jul", cardiovascular: 65, respiratory: 45, gastrointestinal: 40, neurological: 30, other: 42 },
]

export function DiagnosisChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>([
    "cardiovascular",
    "respiratory",
    "gastrointestinal",
    "neurological",
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
    { name: "Cardiovascular", color: "#ef4444" },
    { name: "Respiratory", color: "#3b82f6" },
    { name: "Gastrointestinal", color: "#10b981" },
    { name: "Neurological", color: "#f59e0b" },
    { name: "Other", color: "#8b5cf6" },
  ]

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <PieChart className="h-4 w-4" />
    </Button>
  )

  // For mobile, we'll show a simplified version with fewer data series
  const mobileLegendData = isMobile
    ? [
        { name: "Cardiovascular", color: "#ef4444" },
        { name: "Respiratory", color: "#3b82f6" },
        { name: "Other", color: "#8b5cf6" },
      ]
    : legendData

  return (
    <MobileChartCard title="Diagnosis Trends" description="Monthly diagnosis by category" action={chartAction}>
      <ResponsiveChart
        height={isMobile ? 220 : 300}
        fallback={
          <div className="p-4 flex flex-col space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col border-b pb-2">
                <div className="font-medium text-sm mb-1">{item.name}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Cardio:</span>
                    <span>{item.cardiovascular}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Resp:</span>
                    <span>{item.respiratory}</span>
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
            {activeKeys.includes("cardiovascular") && (
              <Line
                type="monotone"
                dataKey="cardiovascular"
                name="Cardiovascular"
                stroke="#ef4444"
                strokeWidth={2}
                activeDot={{ r: isMobile ? 6 : 8 }}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("respiratory") && (
              <Line
                type="monotone"
                dataKey="respiratory"
                name="Respiratory"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {/* On mobile, we'll only show the most important data series to avoid clutter */}
            {!isMobile && activeKeys.includes("gastrointestinal") && (
              <Line
                type="monotone"
                dataKey="gastrointestinal"
                name="Gastrointestinal"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}
            {!isMobile && activeKeys.includes("neurological") && (
              <Line
                type="monotone"
                dataKey="neurological"
                name="Neurological"
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
            onClick={(name) => toggleDataKey(name.toLowerCase())}
            activeItems={activeKeys.map((k) => k.charAt(0).toUpperCase() + k.slice(1))}
          />
        </div>
      )}
    </MobileChartCard>
  )
}
