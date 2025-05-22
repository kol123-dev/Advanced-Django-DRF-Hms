"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface ResponsiveChartProps {
  children: ReactNode
  height?: number
  className?: string
  fallback?: ReactNode
  loading?: ReactNode
}

export function ResponsiveChart({ children, height = 300, className, fallback, loading }: ResponsiveChartProps) {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("w-full flex items-center justify-center", className)} style={{ height: `${height}px` }}>
        {loading || (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <svg
              className="animate-spin h-8 w-8 mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm">Loading chart...</span>
          </div>
        )}
      </div>
    )
  }

  // If we're on mobile and have a fallback, use it
  if (isMobile && fallback) {
    return (
      <div className={cn("w-full", className)} style={{ height: `${isMobile ? height * 0.8 : height}px` }}>
        {fallback}
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)} style={{ height: `${isMobile ? height * 0.8 : height}px` }}>
      {children}
    </div>
  )
}
