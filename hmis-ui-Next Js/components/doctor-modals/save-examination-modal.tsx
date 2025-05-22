"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clipboard, CheckCircle2 } from "lucide-react"

interface SaveExaminationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
}

export function SaveExaminationModal({ open, onOpenChange, patientName }: SaveExaminationModalProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        onOpenChange(false)
      }, 1500)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Save Examination</DialogTitle>
          <DialogDescription>Save the examination details for {patientName}</DialogDescription>
        </DialogHeader>
        {saved ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Examination Saved</h3>
            <p className="text-sm text-muted-foreground text-center">
              The examination details have been saved successfully.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="summary">Examination Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of the examination findings..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Documentation Type</Label>
                <Select defaultValue="progress">
                  <SelectTrigger>
                    <SelectValue placeholder="Select documentation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">Progress Note</SelectItem>
                    <SelectItem value="consultation">Consultation Note</SelectItem>
                    <SelectItem value="procedure">Procedure Note</SelectItem>
                    <SelectItem value="discharge">Discharge Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Healthcare Providers</SelectItem>
                    <SelectItem value="department">Department Only</SelectItem>
                    <SelectItem value="private">Private (Only Me)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify">Notify other providers involved in patient's care</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="finalize" defaultChecked />
                <Label htmlFor="finalize">Finalize note (cannot be edited after saving)</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Save Examination
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
