"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SyncLogViewer } from "@/components/sync-log-viewer"
import { syncData, getSyncMetadata } from "@/lib/sync-service"
import { RefreshCw, Database, Clock, WifiOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SyncSettingsPage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [syncOnWifi, setSyncOnWifi] = useState(true)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)
  const [pendingChanges, setPendingChanges] = useState(0)
  const { toast } = useToast()

  // Load sync metadata on mount
  useState(() => {
    updateMetadata()
  })

  // Update metadata from IndexedDB
  const updateMetadata = async () => {
    try {
      const metadata = await getSyncMetadata()
      setLastSyncTime(metadata.lastSyncTime ? new Date(metadata.lastSyncTime) : null)
      setPendingChanges(metadata.pendingChanges)
    } catch (error) {
      console.error("Error updating sync metadata:", error)
    }
  }

  // Format last sync time
  const formatLastSync = () => {
    if (!lastSyncTime) return "Never"
    return lastSyncTime.toLocaleString()
  }

  // Handle manual sync
  const handleSync = async () => {
    if (isSyncing) return

    setIsSyncing(true)

    try {
      const result = await syncData()

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

      // Update metadata after sync
      await updateMetadata()
    } catch (error) {
      toast({
        title: "Sync failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Synchronization</h1>
        <p className="text-muted-foreground">Manage how your data syncs between devices and the server</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
            <CardDescription>Current synchronization status and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Synced</p>
                    <p className="text-xs text-muted-foreground">{formatLastSync()}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Pending Changes</p>
                    <p className="text-xs text-muted-foreground">
                      {pendingChanges === 0
                        ? "All data is synced"
                        : `${pendingChanges} change${pendingChanges !== 1 ? "s" : ""} pending`}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleSync} disabled={isSyncing || !navigator.onLine}>
                {isSyncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : !navigator.onLine ? (
                  <>
                    <WifiOff className="mr-2 h-4 w-4" />
                    Offline (Sync Unavailable)
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-sync">Automatic Sync</Label>
                  <p className="text-xs text-muted-foreground">Automatically sync changes when online</p>
                </div>
                <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="wifi-only">Sync on Wi-Fi Only</Label>
                  <p className="text-xs text-muted-foreground">Only sync when connected to Wi-Fi</p>
                </div>
                <Switch id="wifi-only" checked={syncOnWifi} onCheckedChange={setSyncOnWifi} disabled={!autoSync} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offline Data</CardTitle>
            <CardDescription>Manage data available when offline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-patients">Cache Patient Data</Label>
                  <p className="text-xs text-muted-foreground">Store patient information for offline access</p>
                </div>
                <Switch id="cache-patients" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-appointments">Cache Appointments</Label>
                  <p className="text-xs text-muted-foreground">Store appointment information for offline access</p>
                </div>
                <Switch id="cache-appointments" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-lab">Cache Lab Results</Label>
                  <p className="text-xs text-muted-foreground">Store lab test results for offline access</p>
                </div>
                <Switch id="cache-lab" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cache-images">Cache Images</Label>
                  <p className="text-xs text-muted-foreground">Store images for offline access (uses more storage)</p>
                </div>
                <Switch id="cache-images" defaultChecked={false} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Clear Cached Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">Sync Activity Log</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="log" className="mt-4">
          <SyncLogViewer />
        </TabsContent>
        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Sync Settings</CardTitle>
              <CardDescription>Configure advanced synchronization options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="conflict-resolution">Automatic Conflict Resolution</Label>
                  <p className="text-xs text-muted-foreground">Automatically resolve conflicts based on timestamp</p>
                </div>
                <Switch id="conflict-resolution" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="background-sync">Background Sync</Label>
                  <p className="text-xs text-muted-foreground">Sync data in the background even when app is closed</p>
                </div>
                <Switch id="background-sync" defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sync-frequency">Sync Frequency</Label>
                  <p className="text-xs text-muted-foreground">How often to check for changes (in minutes)</p>
                </div>
                <select
                  id="sync-frequency"
                  className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  defaultValue="5"
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <p className="text-xs text-muted-foreground">Number of retry attempts for failed syncs</p>
                </div>
                <select
                  id="retry-attempts"
                  className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  defaultValue="3"
                >
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
