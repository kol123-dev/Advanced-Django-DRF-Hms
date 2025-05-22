import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Printer } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function MedicationDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for a medication
  const medication = {
    id: params.id,
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    category: "Antibiotic",
    description: "Broad-spectrum penicillin antibiotic used to treat various bacterial infections.",
    form: "Tablet",
    strength: "500mg",
    stock: 230,
    unit: "Tablets",
    batchNumber: "B2023-045",
    expiryDate: "2025-06-15",
    manufacturer: "Pharma Labs Inc.",
    supplier: "Med Supplies Inc.",
    location: "Shelf A-12",
    reorderLevel: 50,
    reorderQuantity: 200,
    costPrice: 0.45,
    sellingPrice: 0.95,
    status: "In Stock",
    notes: "Store at room temperature, away from moisture and heat.",
    batchHistory: [
      { batchNumber: "B2023-045", quantity: 300, expiryDate: "2025-06-15", receivedDate: "2023-06-10", remainingQuantity: 230 },
      { batchNumber: "B2022-189", quantity: 250, expiryDate: "2024-03-22", receivedDate: "2022-12-05", remainingQuantity: 0 },
      { batchNumber: "B2022-056", quantity: 200, expiryDate: "2023-11-30", receivedDate: "2022-06-18", remainingQuantity: 0 },
    ],
    transactionHistory: [
      { date: "2023-05-14", type: "Dispensed", quantity: 30, reference: "RX10045", user: "Jane Smith" },
      { date: "2023-05-12", type: "Dispensed", quantity: 20, reference: "RX10032", user: "John Doe" },
      { date: "2023-05-10", type: "Dispensed", quantity: 10, reference: "RX10028", user: "Jane Smith" },
      { date: "2023-05-08", type: "Dispensed", quantity: 10, reference: "RX10015", user: "Robert Johnson" },
      { date: "2023-05-05", type: "Stock Adjustment", quantity: -5, reference: "ADJ-056", user: "Admin" },
      { date: "2023-05-01", type: "Received", quantity: 300, reference: "PO-2023-045", user: "Admin" },
    ],
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Link href="/pharmacy">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{medication.name}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Link href={`/pharmacy/inventory/edit/${medication.id}`}>
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground">
            {medication.genericName} • {medication.strength} • {medication.form}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">ID:</div>
                      <div>{medication.id}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Name:</div>
                      <div>{medication.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Generic Name:</div>
                      <div>{medication.genericName}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Category:</div>
                      <div>{medication.category}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Form:</div>
                      <div>{medication.form}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Strength:</div>
                      <div>{medication.strength}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Inventory Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Current Stock:</div>
                      <div>
                        {medication.stock} {medication.unit}
                        <Badge
                          variant="outline"
                          className="ml-2"
                        >
                          {medication.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Batch Number:</div>
                      <div>{medication.batchNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Expiry Date:</div>
                      <div>{medication.expiryDate}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Location:</div>
                      <div>{medication.location}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Reorder Level:</div>
                      <div>{medication.reorderLevel} {medication.unit}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Reorder Quantity:</div>
                      <div>{medication.reorderQuantity} {medication.unit}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Supplier Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Manufacturer:</div>
                      <div>{medication.manufacturer}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Supplier:</div>
                      <div>{medication.supplier}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Pricing Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Cost Price:</div>
                      <div>${medication.costPrice.toFixed(2)} per unit</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Selling Price:</div>
                      <div>${medication.sellingPrice.toFixed(2)} per unit</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-sm font-medium">Profit Margin:</div>
                      <div>{(((medication.sellingPrice - medication.costPrice) / medication.costPrice) * 100).toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <p>{medication.description}</p>
              </div>

              {medication.notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
                    <p>{medication.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Current Stock Level</h3>
                  <span className="text-sm text-muted-foreground">
                    {medication.stock} / {medication.reorderLevel + medication.reorderQuantity} {medication.unit}
                  </span>
                </div>
                <Progress 
                  value={(medication.stock / (medication.reorderLevel + medication.reorderQuantity)) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Reorder Level: {medication.reorderLevel}</span>
                </span>
                </div>
