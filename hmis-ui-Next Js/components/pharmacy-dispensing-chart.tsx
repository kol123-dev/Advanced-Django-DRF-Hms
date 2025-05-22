"use client"

import { useState, useEffect } from "react"
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { useMobile } from "@/hooks/use-mobile"
import { ResponsiveChart } from "@/components/responsive-chart"
import { ChartTooltip } from "@/components/chart-tooltip"
import { MobileChartCard } from "@/components/mobile-chart-card"
import { ChartLegend } from "@/components/chart-legend"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, BarChart3 } from "lucide-react"

const data = [
  {
    name: "Mon",
    prescriptions: 45,
    otc: 28,
  },
  {
    name: "Tue",
    prescriptions: 52,
    otc: 32,
  },
  {
    name: "Wed",
    prescriptions: 49,
    otc: 30,
  },
  {
    name: "Thu",
    prescriptions: 63,
    otc: 35,
  },
  {
    name: "Fri",
    prescriptions: 58,
    otc: 40,
  },
  {
    name: "Sat",
    prescriptions: 48,
    otc: 52,
  },
  {
    name: "Sun",
    prescriptions: 38,
    otc: 45,
  },
]

// Mobile-optimized data with fewer points
const mobileData = [
  {
    name: "Mon",
    prescriptions: 45,
    otc: 28,
  },
  {
    name: "Wed",
    prescriptions: 49,
    otc: 30,
  },
  {
    name: "Fri",
    prescriptions: 58,
    otc: 40,
  },
  {
    name: "Sun",
    prescriptions: 38,
    otc: 45,
  },
]

export function PharmacyDispensingChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>(["prescriptions", "otc"])
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
    { name: "Prescriptions", color: "#3b82f6" },
    { name: "OTC Medications", color: "#8b5cf6" },
  ]

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <BarChart3 className="h-4 w-4" />
    </Button>
  )

  return (
    <MobileChartCard title="Dispensing Activity" description="Weekly medication dispensing" action={chartAction}>
      <ResponsiveChart
        height={isMobile ? 220 : 300}
        fallback={
          <div className="p-4 flex flex-col space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm border-b pb-2">
                <span className="font-medium">{item.name}</span>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span>{item.prescriptions}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    <span>{item.otc}</span>
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
            {activeKeys.includes("prescriptions") && (
              <Line
                type="monotone"
                dataKey="prescriptions"
                name="Prescriptions"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: isMobile ? 6 : 8 }}
                dot={{ r: isMobile ? 3 : 4 }}
              />
            )}
            {activeKeys.includes("otc") && (
              <Line
                type="monotone"
                dataKey="otc"
                name="OTC Medications"
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
            data={legendData}
            onClick={(name) => {
              if (name === "OTC Medications") {
                toggleDataKey("otc")
              } else {
                toggleDataKey(name.toLowerCase())
              }
            }}
            activeItems={activeKeys.map((k) => {
              if (k === "prescriptions") return "Prescriptions"
              if (k === "otc") return "OTC Medications"
              return k
            })}
          />
        </div>
      )}
    </MobileChartCard>
  )
}
