// This is a simplified version for the preview environment
// In a real app, this would be a full IndexedDB implementation

// Check if IndexedDB is supported
export const isIndexedDBSupported = () => {
  return typeof window !== "undefined" && "indexedDB" in window
}

// Fallback to localStorage when IndexedDB isn't available
export const getStorage = () => {
  if (isIndexedDBSupported()) {
    return {
      getItem: async (key: string) => {
        try {
          const value = localStorage.getItem(key)
          return value ? JSON.parse(value) : null
        } catch (error) {
          console.error("Error getting item from localStorage:", error)
          return null
        }
      },
      setItem: async (key: string, value: any) => {
        try {
          localStorage.setItem(key, JSON.stringify(value))
          return true
        } catch (error) {
          console.error("Error setting item in localStorage:", error)
          return false
        }
      },
      removeItem: async (key: string) => {
        try {
          localStorage.removeItem(key)
          return true
        } catch (error) {
          console.error("Error removing item from localStorage:", error)
          return false
        }
      },
    }
  }

  // Memory fallback when neither is available
  const memoryStorage: Record<string, any> = {}
  return {
    getItem: async (key: string) => memoryStorage[key] || null,
    setItem: async (key: string, value: any) => {
      memoryStorage[key] = value
      return true
    },
    removeItem: async (key: string) => {
      delete memoryStorage[key]
      return true
    },
  }
}

// Queue an operation for later sync
export const addPendingRequest = async (operation: any) => {
  const storage = getStorage()
  const queue = (await storage.getItem("pendingRequests")) || []
  queue.push({
    ...operation,
    timestamp: Date.now(),
    id: Math.random().toString(36).substring(2, 9),
  })
  return storage.setItem("pendingRequests", queue)
}

// Get all queued operations
export const getPendingRequests = async () => {
  const storage = getStorage()
  return (await storage.getItem("pendingRequests")) || []
}

// Remove an operation from the queue
export const removePendingRequest = async (id: string) => {
  const storage = getStorage()
  const queue = (await storage.getItem("pendingRequests")) || []
  const newQueue = queue.filter((op: any) => op.id !== id)
  return storage.setItem("pendingRequests", newQueue)
}

// Get all items from a store\
export const getAllFromStore = async <T>(storeName: string)
: Promise<T[]> =>
{
  const storage = getStorage()
  return await storage.getItem(storeName) || []
}

// Save an item to a store
export const saveToStore = async (storeName: string, value: any) => {
  const storage = getStorage()
  return storage.setItem(storeName, value)
}

// Delete an item from a store
export const deleteFromStore = async (storeName: string, id: string | number) => {
  const storage = getStorage()
  const items = (await storage.getItem(storeName)) || []
  const newItems = items.filter((item: any) => item.id !== id)
  return storage.setItem(storeName, newItems)
}
