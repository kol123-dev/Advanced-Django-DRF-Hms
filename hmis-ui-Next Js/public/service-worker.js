// Hospital Management System Service Worker
const CACHE_NAME = "hms-cache-v1"

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and browser extensions
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.includes("extension") ||
    !event.request.url.startsWith("http")
  ) {
    return
  }

  // For API requests, use network first strategy
  if (event.request.url.includes("/api/")) {
    return networkFirstStrategy(event)
  }

  // For page navigations, use network first with offline fallback
  if (event.request.mode === "navigate") {
    return navigateStrategy(event)
  }

  // For static assets, use cache first strategy
  return cacheFirstStrategy(event)
})

// Network first strategy for API requests
function networkFirstStrategy(event) {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response to store in cache
        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone)
        })
        return response
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          // If no cached response, return offline JSON for API requests
          return new Response(
            JSON.stringify({
              error: "You are offline and this data is not cached.",
              offline: true,
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          )
        })
      }),
  )
}

// Cache first strategy for static assets
function cacheFirstStrategy(event) {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          // For image requests, return a placeholder
          if (event.request.destination === "image") {
            return caches.match("/icons/placeholder.png")
          }
        })
    }),
  )
}

// Navigation strategy with offline fallback
function navigateStrategy(event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match("/offline")
    }),
  )
}

// Listen for sync events to handle background syncing
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-pending-data") {
    event.waitUntil(syncPendingData())
  }
})

// Function to sync pending data when online
async function syncPendingData() {
  try {
    // Get all pending requests from IndexedDB
    const pendingRequests = await getPendingRequests()

    // Process each pending request
    for (const request of pendingRequests) {
      try {
        await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body,
        })

        // Remove from pending queue after successful sync
        await removePendingRequest(request.id)
      } catch (error) {
        console.error("Failed to sync request:", error)
      }
    }
  } catch (error) {
    console.error("Error syncing pending data:", error)
  }
}

// Placeholder functions for IndexedDB operations
// These would be implemented with actual IndexedDB code
async function getPendingRequests() {
  // This would fetch pending requests from IndexedDB
  return []
}

async function removePendingRequest(id) {
  // This would remove a synced request from IndexedDB
  return true
}
