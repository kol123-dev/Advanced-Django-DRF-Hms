"use client"

import { Moon, Sun, Laptop, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAutoTheme, setIsAutoTheme] = useState(false)

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
    // Check if we're in auto theme mode
    const savedTheme = localStorage.getItem("theme")
    setIsAutoTheme(savedTheme === "auto")
  }, [])

  // Handle auto theme selection
  const handleAutoTheme = () => {
    localStorage.setItem("theme", "auto")
    setIsAutoTheme(true)

    // Set initial theme based on time
    const currentHour = new Date().getHours()
    const isDay = currentHour >= 6 && currentHour < 18
    setTheme(isDay ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const getIcon = () => {
    if (!mounted) return <Sun className="h-[1.2rem] w-[1.2rem]" />
    if (isAutoTheme) return <Clock className="h-[1.2rem] w-[1.2rem]" />
    if (theme === "dark") return <Moon className="h-[1.2rem] w-[1.2rem]" />
    if (theme === "light") return <Sun className="h-[1.2rem] w-[1.2rem]" />
    return <Laptop className="h-[1.2rem] w-[1.2rem]" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={isAutoTheme ? "auto" : theme}
          onValueChange={(value) => {
            if (value === "auto") {
              handleAutoTheme()
            } else {
              setIsAutoTheme(false)
              localStorage.setItem("theme", value)
              setTheme(value)
            }
          }}
        >
          <DropdownMenuRadioItem value="light">
            <Sun className="h-4 w-4 mr-2" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="h-4 w-4 mr-2" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="h-4 w-4 mr-2" />
            <span>System</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="auto">
            <Clock className="h-4 w-4 mr-2" />
            <span>Auto (Time-based)</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
