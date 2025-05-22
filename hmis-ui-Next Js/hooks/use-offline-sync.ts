"use client"

import { useState, useEffect } from "react"
import { isOnline, requestBackgroundSync } from "@/lib/service-worker-registration"
import { addPendingRequest } from "@/lib/indexed-db"

type RequestOptions = {
  url: string
  method: string
  headers?: Record<string, string>
  body?: any
}

export function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Set initial state
    setIsOffline(!isOnline())

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // When coming back online, request background sync
    window.addEventListener("online", () => {
      requestBackgroundSync()
    })

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", requestBackgroundSync)
    }
  }, [])

  // Function to handle API requests with offline support
  const syncRequest = async (options: RequestOptions) => {
    const { url, method, headers = {}, body } = options

    // If online, make the request normally
    if (!isOffline) {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        })

        return await response.json()
      } catch (error) {
        // If the request fails, store it for later
        await addPendingRequest({
          url,
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : "",
        })

        throw new Error("Request failed and has been queued for sync")
      }
    } else {
      // If offline, store the request for later
      await addPendingRequest({
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : "",
      })

      return {
        success: false,
        offline: true,
        message: "You are offline. This request has been saved and will be processed when you are back online.",
      }
    }
  }

  return {
    isOffline,
    syncRequest,
  }
}
