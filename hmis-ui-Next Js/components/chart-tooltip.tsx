"use client"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  formatter?: (value: number, name: string) => string
  labelFormatter?: (label: string) => string
  className?: string
}

export function ChartTooltip({ active, payload, label, formatter, labelFormatter, className }: ChartTooltipProps) {
  const isMobile = useMobile()

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div
      className={cn(
        "bg-background border rounded-md shadow-md p-2 text-left",
        isMobile ? "text-xs max-w-[150px]" : "text-sm max-w-[200px]",
        className,
      )}
    >
      <p className="font-medium mb-1">{labelFormatter ? labelFormatter(label || "") : label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
            <span className="mr-1 text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{formatter ? formatter(entry.value, entry.name) : entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
