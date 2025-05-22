// Check if service worker is supported
export const isServiceWorkerSupported = () => {
  return "serviceWorker" in navigator
}

// Check if in production environment
export const isProduction = () => {
  return (
    process.env.NODE_ENV === "production" &&
    !window.location.hostname.includes("vusercontent.net") &&
    !window.location.hostname.includes("localhost")
  )
}

// Check if online
export const isOnline = () => {
  return typeof navigator !== "undefined" ? navigator.onLine : true
}

// Register service worker
export const registerServiceWorker = async () => {
  // Skip registration in development or preview environments
  if (!isServiceWorkerSupported() || !isProduction()) {
    console.log("Service worker registration skipped - not in production or not supported")
    return false
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js")
    console.log("Service worker registered:", registration)
    return true
  } catch (error) {
    console.error("Service worker registration failed:", error)
    // Continue without service worker
    return false
  }
}

// Unregister service worker
export const unregisterServiceWorker = async () => {
  if (!isServiceWorkerSupported()) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      await registration.unregister()
      console.log("Service worker unregistered")
      return true
    }
    return false
  } catch (error) {
    console.error("Service worker unregistration failed:", error)
    return false
  }
}

// Request background sync
export const requestBackgroundSync = async () => {
  if (!isServiceWorkerSupported() || !("SyncManager" in window) || !isProduction()) {
    console.log("Background sync not supported or not in production")
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register("sync-pending-data")
    console.log("Background sync registered")
    return true
  } catch (error) {
    console.error("Background sync registration failed:", error)
    return false
  }
}

// Update service worker
export const updateServiceWorker = async () => {
  if (!isServiceWorkerSupported() || !isProduction()) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      await registration.update()
      console.log("Service worker updated")
      return true
    }
    return false
  } catch (error) {
    console.error("Service worker update failed:", error)
    return false
  }
}

// Initialize sync metadata
export const initSyncMetadata = async () => {
  // In preview environments, use localStorage as a fallback
  if (!isProduction()) {
    console.log("Using localStorage fallback for sync metadata")
    return setupLocalStorageFallback()
  }

  console.log("initSyncMetadata called")
  return true
}

// Setup localStorage fallback for preview environments
const setupLocalStorageFallback = () => {
  // Listen for online/offline events
  window.addEventListener("online", handleOnline)
  window.addEventListener("offline", handleOffline)

  return true
}

// Handle coming back online
const handleOnline = () => {
  console.log("Device is online - would sync data in production")
  // In production, this would trigger data sync
}

// Handle going offline
const handleOffline = () => {
  console.log("Device is offline - would store operations locally in production")
  // In production, this would set up offline storage
}
