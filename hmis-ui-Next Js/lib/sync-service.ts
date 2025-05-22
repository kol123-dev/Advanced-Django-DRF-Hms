import { getPendingRequests, removePendingRequest, getAllFromStore, saveToStore, deleteFromStore } from "./indexed-db"

// Store names
export const STORES = {
  PENDING_REQUESTS: "pendingRequests",
  PATIENTS: "patients",
  APPOINTMENTS: "appointments",
  PRESCRIPTIONS: "prescriptions",
  LAB_TESTS: "labTests",
  SYNC_LOG: "syncLog",
  SYNC_METADATA: "syncMetadata",
}

// Sync status types
export type SyncStatus = "idle" | "syncing" | "success" | "error" | "conflict"

// Sync metadata interface
interface SyncMetadata {
  lastSyncTime: number
  syncInProgress: boolean
  pendingChanges: number
}

// Sync log entry interface
interface SyncLogEntry {
  id?: number
  timestamp: number
  action: string
  status: "success" | "error" | "conflict"
  details: string
  entityType: string
  entityId: string | number
}

// Initialize sync metadata
export async function initSyncMetadata(): Promise<void> {
  try {
    const metadata = await getFromStore<SyncMetadata>(STORES.SYNC_METADATA, "metadata")
    if (!metadata) {
      await saveToStore(STORES.SYNC_METADATA, {
        id: "metadata",
        lastSyncTime: 0,
        syncInProgress: false,
        pendingChanges: 0,
      })
    }
  } catch (error) {
    console.error("Error initializing sync metadata:", error)
  }
}

// Get sync metadata
export async function getSyncMetadata(): Promise<SyncMetadata> {
  try {
    const metadata = await getFromStore<SyncMetadata>(STORES.SYNC_METADATA, "metadata")
    if (!metadata) {
      const defaultMetadata = {
        id: "metadata",
        lastSyncTime: 0,
        syncInProgress: false,
        pendingChanges: 0,
      }
      await saveToStore(STORES.SYNC_METADATA, defaultMetadata)
      return defaultMetadata
    }
    return metadata
  } catch (error) {
    console.error("Error getting sync metadata:", error)
    return {
      lastSyncTime: 0,
      syncInProgress: false,
      pendingChanges: 0,
    }
  }
}

// Update sync metadata
export async function updateSyncMetadata(updates: Partial<SyncMetadata>): Promise<void> {
  try {
    const currentMetadata = await getSyncMetadata()
    await saveToStore(STORES.SYNC_METADATA, {
      ...currentMetadata,
      ...updates,
      id: "metadata",
    })
  } catch (error) {
    console.error("Error updating sync metadata:", error)
  }
}

// Add sync log entry
export async function addSyncLogEntry(entry: Omit<SyncLogEntry, "id" | "timestamp">): Promise<void> {
  try {
    await saveToStore(STORES.SYNC_LOG, {
      ...entry,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error adding sync log entry:", error)
  }
}

// Get sync log entries
export async function getSyncLog(): Promise<SyncLogEntry[]> {
  try {
    return await getAllFromStore<SyncLogEntry>(STORES.SYNC_LOG)
  } catch (error) {
    console.error("Error getting sync log:", error)
    return []
  }
}

// Clear sync log
export async function clearSyncLog(): Promise<void> {
  try {
    const log = await getSyncLog()
    for (const entry of log) {
      if (entry.id) {
        await deleteFromStore(STORES.SYNC_LOG, entry.id)
      }
    }
  } catch (error) {
    console.error("Error clearing sync log:", error)
  }
}

// Main sync function
export async function syncData(): Promise<{ success: boolean; message: string }> {
  // Get current metadata
  const metadata = await getSyncMetadata()

  // If sync is already in progress, return
  if (metadata.syncInProgress) {
    return { success: false, message: "Sync already in progress" }
  }

  // Set sync in progress
  await updateSyncMetadata({ syncInProgress: true })

  try {
    // Get all pending requests
    const pendingRequests = await getPendingRequests()

    // Update metadata with pending changes count
    await updateSyncMetadata({ pendingChanges: pendingRequests.length })

    // If no pending requests, just update last sync time
    if (pendingRequests.length === 0) {
      await updateSyncMetadata({
        lastSyncTime: Date.now(),
        syncInProgress: false,
        pendingChanges: 0,
      })
      return { success: true, message: "No changes to sync" }
    }

    // Process each pending request
    const results = await Promise.allSettled(
      pendingRequests.map(async (request) => {
        try {
          // Extract request details
          const { id, url, method, headers, body, entityType, entityId } = request

          // Make the request
          const response = await fetch(url, {
            method,
            headers: headers || { "Content-Type": "application/json" },
            body: body || undefined,
          })

          // Check if request was successful
          if (!response.ok) {
            // Handle conflict (409) or other errors
            if (response.status === 409) {
              // Log conflict
              await addSyncLogEntry({
                action: `${method} ${url}`,
                status: "conflict",
                details: `Conflict detected for ${entityType} ${entityId}`,
                entityType,
                entityId,
              })

              // Handle conflict resolution here
              await handleConflict(entityType, entityId, body)

              return { success: false, id, status: "conflict" }
            } else {
              // Log error
              await addSyncLogEntry({
                action: `${method} ${url}`,
                status: "error",
                details: `Failed with status ${response.status}`,
                entityType,
                entityId,
              })

              return { success: false, id, status: "error" }
            }
          }

          // Request was successful
          await removePendingRequest(id)

          // Log success
          await addSyncLogEntry({
            action: `${method} ${url}`,
            status: "success",
            details: "Successfully synced",
            entityType,
            entityId,
          })

          return { success: true, id }
        } catch (error) {
          // Log error
          await addSyncLogEntry({
            action: `${method} ${url}`,
            status: "error",
            details: `Exception: ${error.message}`,
            entityType: request.entityType || "unknown",
            entityId: request.entityId || "unknown",
          })

          return { success: false, id: request.id, error: error.message }
        }
      }),
    )

    // Count successful syncs
    const successCount = results.filter((r) => r.status === "fulfilled" && r.value.success).length

    // Count conflicts
    const conflictCount = results.filter((r) => r.status === "fulfilled" && r.value.status === "conflict").length

    // Count errors
    const errorCount = results.filter(
      (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.success && r.value.status !== "conflict"),
    ).length

    // Update metadata
    await updateSyncMetadata({
      lastSyncTime: Date.now(),
      syncInProgress: false,
      pendingChanges: pendingRequests.length - successCount,
    })

    // Return summary
    return {
      success: errorCount === 0,
      message: `Sync completed: ${successCount} succeeded, ${conflictCount} conflicts, ${errorCount} failed`,
    }
  } catch (error) {
    // Update metadata to indicate sync is no longer in progress
    await updateSyncMetadata({ syncInProgress: false })

    // Log the error
    console.error("Sync error:", error)

    return {
      success: false,
      message: `Sync failed: ${error.message}`,
    }
  }
}

// Handle conflicts between local and server data
async function handleConflict(entityType: string, entityId: string | number, localData: string): Promise<void> {
  try {
    // Parse local data
    const localEntity = JSON.parse(localData)

    // Fetch server data
    const response = await fetch(`/api/${entityType}/${entityId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch server data for conflict resolution: ${response.status}`)
    }

    const serverEntity = await response.json()

    // Implement merge strategy based on entity type
    const mergedEntity = mergeEntities(entityType, localEntity, serverEntity)

    // Save merged entity to server
    const updateResponse = await fetch(`/api/${entityType}/${entityId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mergedEntity),
    })

    if (!updateResponse.ok) {
      throw new Error(`Failed to update with merged data: ${updateResponse.status}`)
    }

    // Update local data with merged entity
    await saveToStore(entityType, mergedEntity)

    // Log successful merge
    await addSyncLogEntry({
      action: `MERGE ${entityType}/${entityId}`,
      status: "success",
      details: "Successfully merged conflicting changes",
      entityType,
      entityId,
    })
  } catch (error) {
    // Log error
    await addSyncLogEntry({
      action: `MERGE ${entityType}/${entityId}`,
      status: "error",
      details: `Failed to resolve conflict: ${error.message}`,
      entityType,
      entityId,
    })
  }
}

// Merge entities based on entity type
function mergeEntities(entityType: string, localEntity: any, serverEntity: any): any {
  // Base strategy: use server timestamps to determine which fields to keep
  const merged = { ...serverEntity }

  switch (entityType) {
    case STORES.PATIENTS:
      // For patients, merge medical history and keep most recent contact info
      merged.medicalHistory = [...(serverEntity.medicalHistory || []), ...(localEntity.medicalHistory || [])]
        .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Use most recent contact info
      if (localEntity.lastUpdated > serverEntity.lastUpdated) {
        merged.phone = localEntity.phone
        merged.email = localEntity.email
        merged.address = localEntity.address
      }
      break

    case STORES.APPOINTMENTS:
      // For appointments, use the most recently updated version
      if (localEntity.lastUpdated > serverEntity.lastUpdated) {
        return { ...localEntity, id: serverEntity.id }
      }
      break

    case STORES.PRESCRIPTIONS:
      // For prescriptions, merge medications and keep most recent notes
      merged.medications = [...(serverEntity.medications || []), ...(localEntity.medications || [])].filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id),
      )

      // Use most recent notes
      if (localEntity.lastUpdated > serverEntity.lastUpdated) {
        merged.notes = localEntity.notes
      }
      break

    case STORES.LAB_TESTS:
      // For lab tests, use server version but keep local notes if newer
      if (localEntity.notesLastUpdated > serverEntity.notesLastUpdated) {
        merged.notes = localEntity.notes
      }
      break

    default:
      // Default strategy: use the most recently updated version
      if (localEntity.lastUpdated > serverEntity.lastUpdated) {
        return { ...localEntity, id: serverEntity.id }
      }
  }

  return merged
}

// Helper function to get from store (copied from indexed-db.ts for completeness)
async function getFromStore<T>(storeName: string, id: string | number): Promise<T | null> {
  try {
    // This would normally use the indexed-db.ts implementation
    // For simplicity, we're re-implementing it here
    const db = await openDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const getRequest = store.get(id)

      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result || null)
      }

      getRequest.onerror = (event) => {
        reject(`Error getting from ${storeName}: ` + (event.target as IDBRequest).error)
      }
    })
  } catch (error) {
    console.error(`Error in getFromStore for ${storeName}:`, error)
    return null
  }
}

// Helper function to open the database
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("HospitalManagementSystemDB", 1)

    request.onerror = (event) => {
      reject("IndexedDB error: " + (event.target as IDBOpenDBRequest).error)
    }

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result)
    }
  })
}
