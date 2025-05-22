"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useTimeBasedTheme() {
  const { setTheme } = useTheme()
  const [isAutoMode, setIsAutoMode] = useState(false)

  useEffect(() => {
    // Check if we're in auto theme mode
    const savedTheme = localStorage.getItem("theme")
    setIsAutoMode(savedTheme === "auto")
  }, [])

  // Function to update theme based on current time
  const updateThemeByTime = () => {
    const currentHour = new Date().getHours()
    const isDay = currentHour >= 6 && currentHour < 18 // Day is 6 AM to 6 PM
    setTheme(isDay ? "light" : "dark")
  }

  // Enable auto mode
  const enableAutoMode = () => {
    localStorage.setItem("theme", "auto")
    setIsAutoMode(true)
    updateThemeByTime()
  }

  // Disable auto mode and set specific theme
  const disableAutoMode = (theme: string) => {
    localStorage.setItem("theme", theme)
    setIsAutoMode(false)
    setTheme(theme)
  }

  // Set up interval to check time for auto theme
  useEffect(() => {
    if (!isAutoMode) return

    // Update theme immediately
    updateThemeByTime()

    // Check every minute for time changes
    const interval = setInterval(updateThemeByTime, 60000)

    // Clean up interval on unmount or when auto mode is disabled
    return () => clearInterval(interval)
  }, [isAutoMode, setTheme])

  return {
    isAutoMode,
    enableAutoMode,
    disableAutoMode,
    updateThemeByTime,
  }
}
