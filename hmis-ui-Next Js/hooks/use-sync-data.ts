"use client"

import { useState, useEffect, useCallback } from "react"
import { syncData, getSyncMetadata, updateSyncMetadata } from "@/lib/sync-service"
import { addPendingRequest } from "@/lib/indexed-db"
import { useToast } from "@/hooks/use-toast"

type EntityType = "patients" | "appointments" | "prescriptions" | "labTests"

interface UseSyncDataOptions {
  entityType: EntityType
  autoSync?: boolean
  syncInterval?: number
}

interface SyncState {
  isSyncing: boolean
  lastSyncTime: Date | null
  pendingChanges: number
  isOnline: boolean
}

export function useSyncData({ entityType, autoSync = true, syncInterval = 60000 }: UseSyncDataOptions) {
  const [state, setState] = useState<SyncState>({
    isSyncing: false,
    lastSyncTime: null,
    pendingChanges: 0,
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  })
  const { toast } = useToast()

  // Update metadata from IndexedDB
  const updateMetadataState = useCallback(async () => {
    try {
      const metadata = await getSyncMetadata()
      setState((prev) => ({
        ...prev,
        lastSyncTime: metadata.lastSyncTime ? new Date(metadata.lastSyncTime) : null,
        pendingChanges: metadata.pendingChanges,
        isSyncing: metadata.syncInProgress,
      }))
    } catch (error) {
      console.error("Error updating sync metadata:", error)
    }
  }, [])

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOnline: true }))

      // Trigger sync when coming back online if there are pending changes
      if (state.pendingChanges > 0) {
        syncDataNow()
      }
    }

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOnline: false }))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial metadata update
    updateMetadataState()

    // Set up interval for auto sync if enabled
    let interval: NodeJS.Timeout | null = null
    if (autoSync) {
      interval = setInterval(() => {
        if (navigator.onLine && state.pendingChanges > 0 && !state.isSyncing) {
          syncDataNow()
        }
      }, syncInterval)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (interval) clearInterval(interval)
    }
  }, [autoSync, syncInterval, state.pendingChanges, state.isSyncing, updateMetadataState])

  // Function to sync data
  const syncDataNow = async () => {
    if (!state.isOnline) {
      toast({
        title: "You're offline",
        description: "Cannot sync while offline. Changes will sync when you're back online.",
        variant: "destructive",
      })
      return { success: false, message: "Offline" }
    }

    if (state.isSyncing) {
      return { success: false, message: "Sync already in progress" }
    }

    setState((prev) => ({ ...prev, isSyncing: true }))

    try {
      const result = await syncData()

      // Update state after sync
      await updateMetadataState()

      if (result.success) {
        toast({
          title: "Sync completed",
          description: result.message,
        })
      } else {
        toast({
          title: "Sync issues",
          description: result.message,
          variant: "destructive",
        })
      }

      setState((prev) => ({ ...prev, isSyncing: false }))
      return result
    } catch (error) {
      console.error("Sync error:", error)

      toast({
        title: "Sync failed",
        description: error.message,
        variant: "destructive",
      })

      setState((prev) => ({ ...prev, isSyncing: false }))
      return { success: false, message: error.message }
    }
  }

  // Function to queue an operation for sync
  const queueOperation = async (operation: {
    url: string
    method: string
    headers?: Record<string, string>
    body?: any
    entityId: string | number
  }) => {
    try {
      const { url, method, headers = {}, body, entityId } = operation

      // If online, try to perform the operation immediately
      if (state.isOnline) {
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
        offline: !state.isOnline,
        message: error.message,
      }
    }
  }

  return {
    ...state,
    syncNow: syncDataNow,
    queueOperation,
    updateMetadata: updateMetadataState,
  }
}
