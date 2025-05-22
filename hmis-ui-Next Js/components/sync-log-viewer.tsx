"use client"

import { useState, useEffect } from "react"
import { getSyncLog, clearSyncLog } from "@/lib/sync-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, AlertTriangle, X, RefreshCw, Trash2 } from "lucide-react"

interface SyncLogEntry {
  id?: number
  timestamp: number
  action: string
  status: "success" | "error" | "conflict"
  details: string
  entityType: string
  entityId: string | number
}

export function SyncLogViewer() {
  const [logEntries, setLogEntries] = useState<SyncLogEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Load log entries on mount
  useEffect(() => {
    loadLogEntries()
  }, [])

  // Load log entries from IndexedDB
  const loadLogEntries = async () => {
    setLoading(true)
    try {
      const entries = await getSyncLog()
      // Sort by timestamp, newest first
      entries.sort((a, b) => b.timestamp - a.timestamp)
      setLogEntries(entries)
    } catch (error) {
      console.error("Error loading sync log:", error)
    } finally {
      setLoading(false)
    }
  }

  // Clear all log entries
  const handleClearLog = async () => {
    try {
      await clearSyncLog()
      setLogEntries([])
    } catch (error) {
      console.error("Error clearing sync log:", error)
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      case "conflict":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Success
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            Error
          </Badge>
        )
      case "conflict":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
            Conflict
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sync Activity Log</span>
          <Button variant="ghost" size="sm" onClick={loadLogEntries} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </CardTitle>
        <CardDescription>View the history of data synchronization activities</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : logEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No sync activities recorded yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {logEntries.map((entry, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(entry.status)}
                      <span className="font-medium">{entry.action}</span>
                      {getStatusBadge(entry.status)}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimestamp(entry.timestamp)}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{entry.details}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {entry.entityType}/{entry.entityId}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={handleClearLog}
          disabled={loading || logEntries.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Log
        </Button>
      </CardFooter>
    </Card>
  )
}
