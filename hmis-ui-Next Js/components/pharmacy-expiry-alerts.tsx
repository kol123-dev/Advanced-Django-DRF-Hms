import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle } from "lucide-react"

const expiryAlerts = [
  {
    id: "MED089",
    name: "Amoxicillin 500mg Capsules",
    batch: "B2023-45",
    expiry: "2025-06-15",
    daysLeft: 33,
    quantity: 120,
    location: "Shelf A-12",
  },
  {
    id: "MED124",
    name: "Metformin 850mg Tablets",
    batch: "B2023-78",
    expiry: "2025-06-30",
    daysLeft: 48,
    quantity: 85,
    location: "Shelf C-05",
  },
  {
    id: "MED056",
    name: "Salbutamol 100mcg Inhaler",
    batch: "B2023-22",
    expiry: "2025-07-10",
    daysLeft: 58,
    quantity: 12,
    location: "Shelf D-08",
  },
  {
    id: "MED201",
    name: "Ibuprofen 400mg Tablets",
    batch: "B2023-91",
    expiry: "2025-07-25",
    daysLeft: 73,
    quantity: 210,
    location: "Shelf B-03",
  },
  {
    id: "MED145",
    name: "Omeprazole 20mg Capsules",
    batch: "B2023-67",
    expiry: "2025-08-05",
    daysLeft: 84,
    quantity: 65,
    location: "Shelf C-11",
  },
]

export function PharmacyExpiryAlerts() {
  return (
    <div className="space-y-4">
      {expiryAlerts.map((alert) => (
        <div key={alert.id} className="flex flex-col rounded-lg border p-3 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{alert.name}</span>
                <Badge
                  variant={alert.daysLeft < 45 ? "destructive" : alert.daysLeft < 75 ? "secondary" : "outline"}
                  className="flex items-center gap-1"
                >
                  {alert.daysLeft < 45 && <AlertTriangle className="h-3 w-3" />}
                  {alert.daysLeft} days
                </Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Batch: {alert.batch} | Qty: {alert.quantity} | {alert.location}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3" />
              <span>{alert.expiry}</span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Dispose
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Move to Front
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Apply Discount
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
