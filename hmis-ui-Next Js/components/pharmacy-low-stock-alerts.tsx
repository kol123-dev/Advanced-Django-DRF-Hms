import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const lowStockAlerts = [
  {
    id: "MED005",
    name: "Atorvastatin 20mg Tablets",
    stock: 12,
    reorderLevel: 25,
    supplier: "PharmaWholesale",
    lastOrder: "2025-04-15",
    status: "Critical",
  },
  {
    id: "MED008",
    name: "Omeprazole 20mg Capsules",
    stock: 42,
    reorderLevel: 40,
    supplier: "PharmaWholesale",
    lastOrder: "2025-04-22",
    status: "Low",
  },
  {
    id: "MED003",
    name: "Albuterol 90mcg Inhaler",
    stock: 28,
    reorderLevel: 25,
    supplier: "Global Meds Ltd.",
    lastOrder: "2025-04-10",
    status: "Low",
  },
  {
    id: "MED015",
    name: "Prednisone 5mg Tablets",
    stock: 18,
    reorderLevel: 30,
    supplier: "MedSupply Inc.",
    lastOrder: "2025-04-05",
    status: "Critical",
  },
  {
    id: "MED022",
    name: "Levothyroxine 50mcg Tablets",
    stock: 35,
    reorderLevel: 45,
    supplier: "Global Meds Ltd.",
    lastOrder: "2025-04-18",
    status: "Low",
  },
]

export function PharmacyLowStockAlerts() {
  return (
    <div className="space-y-4">
      {lowStockAlerts.map((alert) => (
        <div key={alert.id} className="flex flex-col rounded-lg border p-3 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{alert.name}</span>
                <Badge
                  variant={alert.status === "Critical" ? "destructive" : "secondary"}
                  className="flex items-center gap-1"
                >
                  {alert.status === "Critical" && <AlertTriangle className="h-3 w-3" />}
                  {alert.status}
                </Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Stock: {alert.stock} | Reorder Level: {alert.reorderLevel} | {alert.supplier}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Package className="h-3 w-3" />
              <span>Last Order: {alert.lastOrder}</span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="default" size="sm" className="h-7 px-2 text-xs">
              Order Now
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Check Alternatives
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              Adjust Reorder Level
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
