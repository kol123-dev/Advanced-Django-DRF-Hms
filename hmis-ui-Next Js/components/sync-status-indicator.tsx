"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudOff, RefreshCw } from "lucide-react"
import { isOnline, isProduction } from "@/lib/service-worker-registration"

export function SyncStatusIndicator() {
  const [online, setOnline] = useState(true)
  const [pendingChanges, setPendingChanges] = useState(0)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    // Set initial state
    setOnline(isOnline())

    // Add event listeners
    const handleOnline = () => {
      setOnline(true)
      // In a real app, this would trigger sync
      if (pendingChanges > 0 && isProduction()) {
        simulateSync()
      }
    }

    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Simulate pending changes for demo
    const interval = setInterval(() => {
      if (!isOnline() && Math.random() > 0.7) {
        setPendingChanges((prev) => prev + 1)
      }
    }, 10000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [pendingChanges])

  // Simulate sync process
  const simulateSync = () => {
    if (pendingChanges === 0) return

    setSyncing(true)
    setTimeout(() => {
      setPendingChanges(0)
      setSyncing(false)
    }, 2000)
  }

  // Handle manual sync
  const handleSync = () => {
    if (!online || pendingChanges === 0 || syncing) return
    simulateSync()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSync}
        disabled={!online || pendingChanges === 0 || syncing}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
        title={online ? "Sync changes" : "Offline"}
      >
        {online ? <Cloud className="h-4 w-4 text-green-500" /> : <CloudOff className="h-4 w-4 text-yellow-500" />}

        {pendingChanges > 0 && (
          <span className="flex items-center gap-1">
            {syncing ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-xs text-white">{pendingChanges}</span>
            )}
          </span>
        )}
      </button>
    </div>
  )
}
