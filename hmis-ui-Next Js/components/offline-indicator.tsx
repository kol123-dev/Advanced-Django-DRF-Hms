"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { isOnline } from "@/lib/service-worker-registration"

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    // Set initial state
    setOffline(!isOnline())

    // Add event listeners
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!offline) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 shadow-lg dark:bg-yellow-900 dark:text-yellow-200">
      <WifiOff className="h-4 w-4" />
      <span>You are offline. Some features may be limited.</span>
    </div>
  )
}
