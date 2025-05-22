"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function DarkModeScript() {
  const { setTheme } = useTheme()

  // This effect runs only once on mount to initialize the theme
  useEffect(() => {
    // Check for saved theme preference or use time-based theme
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme && savedTheme !== "auto") {
      // Use saved theme if it exists and is not "auto"
      setTheme(savedTheme)
    } else {
      // If theme is "auto" or not set, use time-based theme
      const currentHour = new Date().getHours()
      const isDay = currentHour >= 6 && currentHour < 18 // Day is 6 AM to 6 PM

      // Set theme based on time of day
      setTheme(isDay ? "light" : "dark")

      // If theme was "auto", set up interval to check time
      if (savedTheme === "auto") {
        // Store that we're using auto mode
        localStorage.setItem("theme", "auto")
      }
    }

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem("theme")
      // Only update if using system theme
      if (currentTheme === "system") {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [setTheme]) // Only depend on setTheme, not theme itself

  // Set up interval to check time for auto theme
  useEffect(() => {
    // Function to update theme based on time
    const updateThemeByTime = () => {
      const currentTheme = localStorage.getItem("theme")

      // Only update if in auto mode
      if (currentTheme === "auto") {
        const currentHour = new Date().getHours()
        const isDay = currentHour >= 6 && currentHour < 18
        setTheme(isDay ? "light" : "dark")
      }
    }

    // Check every minute for time changes
    const interval = setInterval(updateThemeByTime, 60000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [setTheme])

  return null
}
