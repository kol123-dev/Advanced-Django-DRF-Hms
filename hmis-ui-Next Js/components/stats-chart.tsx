"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMobile } from "@/hooks/use-mobile"
import { ChartTooltip } from "@/components/chart-tooltip"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const data = [
  { name: "1", admissions: 40, discharges: 24 },
  { name: "5", admissions: 30, discharges: 13 },
  { name: "10", admissions: 20, discharges: 28 },
  { name: "15", admissions: 27, discharges: 39 },
  { name: "20", admissions: 18, discharges: 20 },
  { name: "25", admissions: 23, discharges: 17 },
  { name: "30", admissions: 34, discharges: 32 },
]

// Mobile-optimized simplified data (fewer data points)
const mobileData = [
  { name: "1", admissions: 40, discharges: 24 },
  { name: "10", admissions: 20, discharges: 28 },
  { name: "20", admissions: 18, discharges: 20 },
  { name: "30", admissions: 34, discharges: 32 },
]

export function StatsChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>(["admissions", "discharges"])
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
    { name: "Admissions", color: "#10b981", value: data.reduce((sum, item) => sum + item.admissions, 0) },
    { name: "Discharges", color: "#6366f1", value: data.reduce((sum, item) => sum + item.discharges, 0) },
  ]

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <Calendar className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="w-full h-[300px]">
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
            label={isMobile ? undefined : { value: "Day of Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            tick={{ fontSize: isMobile ? 10 : 12 }}
            width={isMobile ? 25 : 40}
            axisLine={{ stroke: "#e0e0e0" }}
            tickLine={{ stroke: "#e0e0e0" }}
            tickFormatter={(value) => (isMobile ? `${value}` : `${value}`)}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {activeKeys.includes("admissions") && (
            <Line
              type="monotone"
              dataKey="admissions"
              name="Admissions"
              stroke="#10b981"
              strokeWidth={2}
              activeDot={{ r: isMobile ? 6 : 8 }}
              dot={{ r: isMobile ? 3 : 4 }}
            />
          )}
          {activeKeys.includes("discharges") && (
            <Line
              type="monotone"
              dataKey="discharges"
              name="Discharges"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: isMobile ? 3 : 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
