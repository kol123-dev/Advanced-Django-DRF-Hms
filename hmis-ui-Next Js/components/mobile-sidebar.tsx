"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Activity,
  Calendar,
  ClipboardList,
  CreditCard,
  FlaskRoundIcon as Flask,
  Home,
  ListOrdered,
  Package,
  Settings,
  Users,
  X,
  MessageSquare,
  Pill,
  Stethoscope,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface NavItem {
  title: string
  href: string
  icon: ReactNode
  color: string
  darkColor: string
  category?: string
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
    color: "text-blue-500",
    darkColor: "dark:text-blue-400",
    category: "main",
  },
  {
    title: "Patients",
    href: "/patients",
    icon: <Users className="h-5 w-5" />,
    color: "text-emerald-500",
    darkColor: "dark:text-emerald-400",
    category: "main",
  },
  {
    title: "Staff",
    href: "/staff",
    icon: <Activity className="h-5 w-5" />,
    color: "text-purple-500",
    darkColor: "dark:text-purple-400",
    category: "main",
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: <Calendar className="h-5 w-5" />,
    color: "text-amber-500",
    darkColor: "dark:text-amber-400",
    category: "main",
  },
  {
    title: "Queue Management",
    href: "/queue",
    icon: <ListOrdered className="h-5 w-5" />,
    color: "text-rose-500",
    darkColor: "dark:text-rose-400",
    category: "main",
  },
  {
    title: "Triage",
    href: "/triage",
    icon: <Activity className="h-5 w-5" />,
    color: "text-red-500",
    darkColor: "dark:text-red-400",
    category: "clinical",
  },
  {
    title: "Doctor Console",
    href: "/doctor-console",
    icon: <Stethoscope className="h-5 w-5" />,
    color: "text-sky-500",
    darkColor: "dark:text-sky-400",
    category: "clinical",
  },
  {
    title: "Medical Records",
    href: "/medical-records",
    icon: <ClipboardList className="h-5 w-5" />,
    color: "text-teal-500",
    darkColor: "dark:text-teal-400",
    category: "clinical",
  },
  {
    title: "Lab",
    href: "/lab",
    icon: <Flask className="h-5 w-5" />,
    color: "text-violet-500",
    darkColor: "dark:text-violet-400",
    category: "clinical",
  },
  {
    title: "Diagnosis",
    href: "/diagnosis",
    icon: <UserRound className="h-5 w-5" />,
    color: "text-cyan-500",
    darkColor: "dark:text-cyan-400",
    category: "clinical",
  },
  {
    title: "Prescriptions",
    href: "/prescriptions",
    icon: <Pill className="h-5 w-5" />,
    color: "text-pink-500",
    darkColor: "dark:text-pink-400",
    category: "clinical",
  },
  {
    title: "Communication",
    href: "/communication",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "text-green-500",
    darkColor: "dark:text-green-400",
    category: "support",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: <CreditCard className="h-5 w-5" />,
    color: "text-orange-500",
    darkColor: "dark:text-orange-400",
    category: "support",
  },
  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: <Package className="h-5 w-5" />,
    color: "text-lime-500",
    darkColor: "dark:text-lime-400",
    category: "support",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    color: "text-gray-500",
    darkColor: "dark:text-gray-400",
    category: "support",
  },
]

interface MobileSidebarProps {
  onClose: () => void
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  const categories = {
    main: "Main",
    clinical: "Clinical",
    support: "Support",
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Hospital MS</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <div className="space-y-4 px-3">
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="space-y-2">
              <h3 className="px-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</h3>
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link key={item.href} href={item.href} onClick={onClose}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start rounded-md transition-all duration-200 group h-10",
                            isActive
                              ? "bg-accent/50 text-accent-foreground"
                              : "hover:bg-accent/30 hover:text-accent-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "h-5 w-5 mr-3",
                              item.color,
                              item.darkColor,
                              isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
                            )}
                          >
                            {React.cloneElement(item.icon as React.ReactElement, {
                              strokeWidth: 1.75,
                            })}
                          </span>
                          <span
                            className={cn(
                              "font-medium",
                              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                            )}
                          >
                            {item.title}
                          </span>
                          {isActive && <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />}
                        </Button>
                      </Link>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 py-4 border-t">
        <div className="px-4 py-2 rounded-lg bg-accent/30 flex items-center">
          <div className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center mr-3">
            <UserRound className="h-4 w-4 text-accent-foreground" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-medium">Dr. Sarah Chen</p>
            <p className="text-xs text-muted-foreground">Cardiologist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
