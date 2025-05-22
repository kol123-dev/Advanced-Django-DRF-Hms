import { cn } from "@/lib/utils"
import type React from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return (
    <div className={cn("w-full px-4 sm:px-6 py-4 sm:py-6 md:py-8 max-w-[1600px] mx-auto", className)}>{children}</div>
  )
}
