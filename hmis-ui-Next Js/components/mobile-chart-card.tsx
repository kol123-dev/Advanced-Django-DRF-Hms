import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function MobileChartCard({ title, description, children, className, action }: MobileChartCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription className="text-xs mt-0.5">{description}</CardDescription>}
        </div>
        {action && <div className="ml-auto">{action}</div>}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  )
}
