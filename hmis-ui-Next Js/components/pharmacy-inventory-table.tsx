import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Filter, ArrowUpDown, Edit, Trash, Eye, Package, AlertTriangle } from "lucide-react"
import Link from "next/link"

const medications = [
  {
    id: "MED001",
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "500mg",
    form: "Capsule",
    stock: 342,
    status: "In Stock",
    expiry: "2025-12-15",
    supplier: "MedSupply Inc.",
    reorderLevel: 50,
  },
  {
    id: "MED002",
    name: "Lisinopril",
    category: "Antihypertensive",
    dosage: "10mg",
    form: "Tablet",
    stock: 156,
    status: "In Stock",
    expiry: "2026-03-22",
    supplier: "PharmaWholesale",
    reorderLevel: 30,
  },
  {
    id: "MED003",
    name: "Albuterol",
    category: "Bronchodilator",
    dosage: "90mcg",
    form: "Inhaler",
    stock: 28,
    status: "Low Stock",
    expiry: "2025-08-10",
    supplier: "Global Meds Ltd.",
    reorderLevel: 25,
  },
  {
    id: "MED004",
    name: "Metformin",
    category: "Antidiabetic",
    dosage: "850mg",
    form: "Tablet",
    stock: 215,
    status: "In Stock",
    expiry: "2026-01-05",
    supplier: "MedSupply Inc.",
    reorderLevel: 40,
  },
  {
    id: "MED005",
    name: "Atorvastatin",
    category: "Statin",
    dosage: "20mg",
    form: "Tablet",
    stock: 12,
    status: "Critical",
    expiry: "2025-11-30",
    supplier: "PharmaWholesale",
    reorderLevel: 25,
  },
  {
    id: "MED006",
    name: "Loratadine",
    category: "Antihistamine",
    dosage: "10mg",
    form: "Tablet",
    stock: 87,
    status: "In Stock",
    expiry: "2025-09-18",
    supplier: "Global Meds Ltd.",
    reorderLevel: 20,
  },
  {
    id: "MED007",
    name: "Ibuprofen",
    category: "NSAID",
    dosage: "400mg",
    form: "Tablet",
    stock: 178,
    status: "In Stock",
    expiry: "2026-02-14",
    supplier: "MedSupply Inc.",
    reorderLevel: 35,
  },
  {
    id: "MED008",
    name: "Omeprazole",
    category: "PPI",
    dosage: "20mg",
    form: "Capsule",
    stock: 42,
    status: "Low Stock",
    expiry: "2025-10-25",
    supplier: "PharmaWholesale",
    reorderLevel: 40,
  },
]

export function PharmacyInventoryTable() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search medications..." className="w-[250px] pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Category</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Supplier</DropdownMenuItem>
              <DropdownMenuItem>Expiry Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Link href="/pharmacy/inventory/add">
            <Button size="sm">
              <Package className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">{medication.id}</TableCell>
                <TableCell>{medication.name}</TableCell>
                <TableCell>{medication.category}</TableCell>
                <TableCell>{medication.dosage}</TableCell>
                <TableCell>{medication.form}</TableCell>
                <TableCell>{medication.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      medication.status === "In Stock"
                        ? "outline"
                        : medication.status === "Low Stock"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {medication.status === "Critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {medication.status}
                  </Badge>
                </TableCell>
                <TableCell>{medication.expiry}</TableCell>
                <TableCell>{medication.supplier}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/pharmacy/inventory/${medication.id}`} className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        Update Stock
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
