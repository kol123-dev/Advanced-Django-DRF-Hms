"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Calendar,
  ClipboardList,
  CreditCard,
  FlaskRound as Flask,
  Home,
  ListOrdered,
  Package,
  Settings,
  Users,
  MessageSquare,
  Pill,
  Stethoscope,
  UserRound,
  Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMobile } from "@/hooks/use-mobile";
import type { ProfileData } from "@/lib/api/user-profile";

// 🔁 Define NavItem interface
interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  darkColor: string;
  category?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 🧠 Use hook to fetch current user data
  const { user, loading } = useCurrentUser();

  // 📦 Navigation categories
  const categories = {
    main: "Main",
    clinical: "Clinical",
    support: "Support",
  };

  // 🧾 Sidebar menu items
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
  ];

  // 🧮 Combine title + full_name
  const displayName =
    user?.profile.title && user?.profile.full_name
      ? `${user.profile.title} ${user.profile.full_name}`
      : user?.email.split("@")[0] || "Welcome";

  const specialty = user?.profile.specialty || "Not Set";
  const department = user?.profile.department || "";

  // 🖼️ Avatar fallback logic
  // const avatarInitials = displayName
  //   .split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase()
  //   .slice(0, 2);

  // const avatarSrc = user?.profile.profile_photo
  //   ? `${process.env.NEXT_PUBLIC_API_URL}${user.profile.profile_photo}`
  //   : "/placeholder.svg?height=32&width=32";

  if (isMobile) {
    return null; // Mobile sidebar handled in Header
  }

  return (
    <div
      className={cn(
        "hidden border-r bg-background/95 backdrop-blur-sm md:block transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Logo / App Name */}
        <div
          className={cn("px-3 mb-8", isCollapsed ? "flex justify-center" : "")}
        >
          <h2
            className={cn(
              "font-bold tracking-tight text-foreground",
              isCollapsed ? "text-base px-0" : "text-xl px-4"
            )}
          >
            {isCollapsed ? "HMS" : "Infinia HMS"}
          </h2>
        </div>

        {/* Main Navigation Items */}
        <div className="space-y-6 px-3 flex-1 overflow-auto">
          {Object.entries(categories).map(([category, title]) => (
            <div key={category} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {title}
                </h3>
              )}
              <div className="space-y-1">
                {navItems
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start rounded-md transition-all duration-200 group",
                            isCollapsed ? "h-10 px-2" : "h-10",
                            isActive
                              ? "bg-accent/50 text-accent-foreground"
                              : "hover:bg-accent/30 hover:text-accent-foreground"
                          )}
                          title={isCollapsed ? item.title : undefined}
                        >
                          <span
                            className={cn(
                              "h-5 w-5",
                              isCollapsed ? "" : "mr-3",
                              item.color,
                              item.darkColor,
                              isActive
                                ? "opacity-100"
                                : "opacity-80 group-hover:opacity-100"
                            )}
                          >
                            {React.cloneElement(
                              item.icon as React.ReactElement<{
                                strokeWidth?: number;
                              }>,
                              {
                                strokeWidth: 1.75,
                              }
                            )}
                          </span>
                          {!isCollapsed && (
                            <span
                              className={cn(
                                "font-medium",
                                isActive
                                  ? "text-foreground"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              {item.title}
                            </span>
                          )}
                          {isActive && (
                            <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />
                          )}
                        </Button>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* User Info Section at Bottom */}
        {!isCollapsed && (
          <div className="px-3 mt-auto pt-6 border-t">
            <div className="px-4 py-2 rounded-lg bg-accent/30 flex items-center">
              {/* <div className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center mr-3">
                <AvatarFallback className="text-accent-foreground text-sm font-medium">
                  {avatarInitials}
                </AvatarFallback>
              </div> */}
              <div>
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {specialty} • {department}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse/Expand Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-4 mx-auto"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform duration-200",
              isCollapsed ? "rotate-180" : ""
            )}
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
