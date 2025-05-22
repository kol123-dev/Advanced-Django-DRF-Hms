"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="container flex h-full flex-col items-center justify-center py-10">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
            <WifiOff className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
          <CardTitle className="text-xl">You're Offline</CardTitle>
          <CardDescription>You appear to be offline. This content is not available offline.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            You can still access previously visited pages and perform some actions while offline. Your changes will be
            synchronized when you're back online.
          </p>

          <div className="flex flex-col gap-2">
            <Button asChild variant="default">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>

            <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
