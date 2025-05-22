"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { useMobile } from "@/hooks/use-mobile"
import { ResponsiveChart } from "@/components/responsive-chart"
import { ChartTooltip } from "@/components/chart-tooltip"
import { MobileChartCard } from "@/components/mobile-chart-card"
import { ChartLegend } from "@/components/chart-legend"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, PieChart } from "lucide-react"

const data = [
  {
    name: "Antibiotics",
    inStock: 1245,
    lowStock: 32,
    outOfStock: 5,
  },
  {
    name: "Analgesics",
    inStock: 980,
    lowStock: 45,
    outOfStock: 8,
  },
  {
    name: "Antihypertensives",
    inStock: 1100,
    lowStock: 28,
    outOfStock: 3,
  },
  {
    name: "Antidiabetics",
    inStock: 750,
    lowStock: 15,
    outOfStock: 2,
  },
  {
    name: "Antihistamines",
    inStock: 620,
    lowStock: 18,
    outOfStock: 0,
  },
  {
    name: "Bronchodilators",
    inStock: 480,
    lowStock: 22,
    outOfStock: 4,
  },
  {
    name: "Statins",
    inStock: 520,
    lowStock: 12,
    outOfStock: 1,
  },
]

// Mobile-optimized data with shorter names and fewer categories
const mobileData = [
  {
    name: "Antibiotics",
    inStock: 1245,
    lowStock: 32,
    outOfStock: 5,
  },
  {
    name: "Analgesics",
    inStock: 980,
    lowStock: 45,
    outOfStock: 8,
  },
  {
    name: "Anti-HTN",
    inStock: 1100,
    lowStock: 28,
    outOfStock: 3,
  },
  {
    name: "Anti-DM",
    inStock: 750,
    lowStock: 15,
    outOfStock: 2,
  },
  {
    name: "Others",
    inStock: 1620,
    lowStock: 52,
    outOfStock: 5,
  },
]

export function PharmacyInventoryChart() {
  const isMobile = useMobile()
  const [activeKeys, setActiveKeys] = useState<string[]>(["inStock", "lowStock", "outOfStock"])

  // Toggle data series visibility
  const toggleDataKey = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key))
    } else {
      setActiveKeys([...activeKeys, key])
    }
  }

  const legendData = [
    { name: "In Stock", color: "#10b981" },
    { name: "Low Stock", color: "#f59e0b" },
    { name: "Out of Stock", color: "#ef4444" },
  ]

  const chartAction = (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <PieChart className="h-4 w-4" />
    </Button>
  )

  const chartData = isMobile ? mobileData : data

  return (
    <MobileChartCard title="Inventory Status" description="Medication stock levels by category" action={chartAction}>
      <ResponsiveChart
        height={isMobile ? 220 : 300}
        fallback={
          <div className="p-4 flex flex-col space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col border-b pb-2">
                <div className="font-medium text-sm mb-1">{item.name}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">In:</span>
                    <span>{item.inStock}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Low:</span>
                    <span>{item.lowStock}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-muted-foreground mr-1">Out:</span>
                    <span>{item.outOfStock}</span>
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
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: isMobile ? 5 : 20,
              left: isMobile ? 0 : 10,
              bottom: 5,
            }}
            barSize={isMobile ? 15 : 20}
            barGap={isMobile ? 2 : 5}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isMobile ? "#f0f0f0" : "#e0e0e0"} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: isMobile ? 9 : 12 }}
              tickMargin={isMobile ? 5 : 10}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
              interval={0}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 35 : 40}
              axisLine={{ stroke: "#e0e0e0" }}
              tickLine={{ stroke: "#e0e0e0" }}
              tickFormatter={(value) => (isMobile ? `${value}` : `${value}`)}
            />
            <Tooltip content={<ChartTooltip />} />
            {!isMobile && <Legend />}
            {activeKeys.includes("inStock") && (
              <Bar dataKey="inStock" fill="#10b981" name="In Stock" radius={[4, 4, 0, 0]} />
            )}
            {activeKeys.includes("lowStock") && (
              <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" radius={[4, 4, 0, 0]} />
            )}
            {activeKeys.includes("outOfStock") && (
              <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </ResponsiveChart>
      {isMobile && (
        <div className="px-4 pb-3 pt-1">
          <ChartLegend
            data={legendData}
            onClick={(name) => toggleDataKey(name.replace(" ", "").toLowerCase())}
            activeItems={activeKeys.map((k) => {
              if (k === "inStock") return "In Stock"
              if (k === "lowStock") return "Low Stock"
              if (k === "outOfStock") return "Out of Stock"
              return k
            })}
          />
        </div>
      )}
    </MobileChartCard>
  )
}
