"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { syncData, getSyncMetadata, updateSyncMetadata } from "@/lib/sync-service"
import { addPendingRequest } from "@/lib/indexed-db"

interface DataSyncContextType {
  isOnline: boolean
  isSyncing: boolean
  lastSyncTime: Date | null
  pendingChanges: number
  syncNow: () => Promise<{ success: boolean; message: string }>
  queueOperation: (operation: QueuedOperation) => Promise<QueueOperationResult>
}

interface QueuedOperation {
  url: string
  method: string
  headers?: Record<string, string>
  body?: any
  entityType: string
  entityId: string | number
}

interface QueueOperationResult {
  success: boolean
  offline?: boolean
  data?: any
  message?: string
}

const DataSyncContext = createContext<DataSyncContextType | undefined>(undefined)

export function DataSyncProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)
  const [pendingChanges, setPendingChanges] = useState(0)

  // Update metadata from IndexedDB
  const updateMetadataState = async () => {
    try {
      const metadata = await getSyncMetadata()
      setLastSyncTime(metadata.lastSyncTime ? new Date(metadata.lastSyncTime) : null)
      setPendingChanges(metadata.pendingChanges)
      setIsSyncing(metadata.syncInProgress)
    } catch (error) {
      console.error("Error updating sync metadata:", error)
    }
  }

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)

      // Trigger sync when coming back online if there are pending changes
      if (pendingChanges > 0) {
        syncNow()
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial metadata update
    updateMetadataState()

    // Set up interval for checking pending changes
    const interval = setInterval(updateMetadataState, 30000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [pendingChanges])

  // Function to sync data
  const syncNow = async () => {
    if (!isOnline) {
      return { success: false, message: "Cannot sync while offline" }
    }

    if (isSyncing) {
      return { success: false, message: "Sync already in progress" }
    }

    setIsSyncing(true)

    try {
      const result = await syncData()

      // Update state after sync
      await updateMetadataState()

      return result
    } catch (error) {
      console.error("Sync error:", error)

      // Update state
      setIsSyncing(false)

      return { success: false, message: error.message }
    }
  }

  // Function to queue an operation for sync
  const queueOperation = async (operation: QueuedOperation): Promise<QueueOperationResult> => {
    try {
      const { url, method, headers = {}, body, entityType, entityId } = operation

      // If online, try to perform the operation immediately
      if (isOnline) {
        try {
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
          })

          if (response.ok) {
            return {
              success: true,
              data: await response.json(),
              offline: false,
            }
          }
        } catch (error) {
          console.error("Operation failed, queueing for later:", error)
          // If the operation fails, fall through to queue it
        }
      }

      // Queue the operation for later
      await addPendingRequest({
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : "",
        entityType,
        entityId,
      })

      // Update pending changes count
      const metadata = await getSyncMetadata()
      await updateSyncMetadata({
        pendingChanges: metadata.pendingChanges + 1,
      })

      // Update state
      await updateMetadataState()

      return {
        success: true,
        offline: true,
        message: "Operation queued for sync when online",
      }
    } catch (error) {
      console.error("Error queueing operation:", error)
      return {
        success: false,
        offline: !isOnline,
        message: error.message,
      }
    }
  }

  const value = {
    isOnline,
    isSyncing,
    lastSyncTime,
    pendingChanges,
    syncNow,
    queueOperation,
  }

  return <DataSyncContext.Provider value={value}>{children}</DataSyncContext.Provider>
}

export const useDataSync = () => {
  const context = useContext(DataSyncContext)
  if (context === undefined) {
    throw new Error("useDataSync must be used within a DataSyncProvider")
  }
  return context
}
