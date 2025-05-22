"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

// Department queue summary
const departmentQueues = [
  { name: "Triage", waiting: 3, avgWait: 10 },
  { name: "Consultation R1", waiting: 4, avgWait: 25 },
  { name: "Consultation R2", waiting: 2, avgWait: 15 },
  { name: "Lab", waiting: 5, avgWait: 20 },
  { name: "Pharmacy", waiting: 6, avgWait: 12 },
  { name: "Dental", waiting: 2, avgWait: 30 },
  { name: "Eye Clinic", waiting: 3, avgWait: 22 },
]

// Summary data
const queueSummary = {
  totalWaiting: departmentQueues.reduce((sum, dept) => sum + dept.waiting, 0),
  averageWaitTime: Math.round(
    departmentQueues.reduce((sum, dept) => sum + dept.avgWait * dept.waiting, 0) /
      departmentQueues.reduce((sum, dept) => sum + dept.waiting, 0),
  ),
  emergencyCases: 1,
}

export function QueueManagementWidget() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {queueSummary.totalWaiting} Patients Waiting
          </Badge>
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {queueSummary.averageWaitTime} min avg
          </Badge>
        </div>
        <Badge variant="destructive" className="text-xs">
          {queueSummary.emergencyCases} Emergency
        </Badge>
      </div>

      <div className="space-y-3">
        {departmentQueues.map((dept) => (
          <div key={dept.name} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm">{dept.name}</div>
              <div className="text-xs text-muted-foreground">
                {dept.waiting} {dept.waiting === 1 ? "patient" : "patients"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={dept.waiting > 0 ? 100 : 0}
                className="h-2"
                indicatorClassName={
                  dept.avgWait > 30 ? "bg-destructive" : dept.avgWait > 15 ? "bg-amber-500" : "bg-emerald-500"
                }
              />
              <span className="text-xs min-w-[40px] text-right">
                {dept.waiting > 0 ? `${dept.avgWait} min` : "No wait"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link href="/queue">
          <Button variant="outline" size="sm" className="w-full">
            View Queue Management
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
