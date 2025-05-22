import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
}

export function ResponsiveGrid({
  children,
  className,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "gap-4",
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const { default: defaultCols, sm, md, lg, xl } = cols

    return cn(
      `grid-cols-${defaultCols}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    )
  }

  return <div className={cn("grid", getGridCols(), gap, className)}>{children}</div>
}
