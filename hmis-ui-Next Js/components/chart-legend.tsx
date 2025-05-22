"use client"

import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ChartLegendProps {
  data: {
    name: string
    color: string
    value?: number | string
  }[]
  className?: string
  onClick?: (name: string) => void
  activeItems?: string[]
}

export function ChartLegend({ data, className, onClick, activeItems }: ChartLegendProps) {
  const isMobile = useMobile()

  return (
    <div className={cn("flex flex-wrap gap-2 justify-center pt-2", isMobile ? "text-xs" : "text-sm", className)}>
      {data.map((item) => {
        const isActive = !activeItems || activeItems.includes(item.name)
        return (
          <div
            key={item.name}
            className={cn(
              "flex items-center px-2 py-1 rounded-full border transition-colors",
              onClick ? "cursor-pointer hover:bg-muted" : "",
              !isActive && "opacity-50",
            )}
            onClick={() => onClick && onClick(item.name)}
          >
            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
            <span className="mr-1">{item.name}</span>
            {item.value && <span className="font-medium">{item.value}</span>}
          </div>
        )
      })}
    </div>
  )
}
