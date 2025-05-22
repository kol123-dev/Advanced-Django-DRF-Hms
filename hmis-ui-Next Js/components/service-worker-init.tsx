"use client"

import { useEffect, useState } from "react"
import { registerServiceWorker, isServiceWorkerSupported, isProduction } from "@/lib/service-worker-registration"

export function ServiceWorkerInit() {
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        // Only attempt to register in production environments
        if (isServiceWorkerSupported() && isProduction()) {
          const success = await registerServiceWorker()
          setRegistered(success)
          if (!success) {
            setError("Service worker registration failed")
          }
        } else {
          console.log("Service workers not supported or not in production - skipping registration")
          // In preview environments, we'll use alternative methods
          if (!isProduction()) {
            console.log("Running in preview/development environment - using fallbacks")
          }
        }
      } catch (err) {
        console.error("Error initializing service worker:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    init()
  }, [])

  // This component doesn't render anything visible
  return null
}
