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
import {
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Eye,
  Package,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const prescriptions = [
  {
    id: "RX10045",
    patient: "John Smith",
    patientId: "P10023",
    doctor: "Dr. Sarah Johnson",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", quantity: 30 },
      { name: "Ibuprofen", dosage: "400mg", quantity: 20 },
    ],
    date: "2025-05-12",
    status: "Ready for Pickup",
    priority: "Normal",
  },
  {
    id: "RX10046",
    patient: "Emily Davis",
    patientId: "P10045",
    doctor: "Dr. Michael Chen",
    medications: [{ name: "Lisinopril", dosage: "10mg", quantity: 60 }],
    date: "2025-05-12",
    status: "Processing",
    priority: "Normal",
  },
  {
    id: "RX10047",
    patient: "Robert Johnson",
    patientId: "P10089",
    doctor: "Dr. Lisa Wong",
    medications: [
      { name: "Metformin", dosage: "850mg", quantity: 90 },
      { name: "Atorvastatin", dosage: "20mg", quantity: 30 },
    ],
    date: "2025-05-12",
    status: "Dispensed",
    priority: "Normal",
  },
  {
    id: "RX10048",
    patient: "Maria Garcia",
    patientId: "P10102",
    doctor: "Dr. James Wilson",
    medications: [{ name: "Albuterol", dosage: "90mcg", quantity: 1 }],
    date: "2025-05-12",
    status: "Ready for Pickup",
    priority: "Urgent",
  },
  {
    id: "RX10049",
    patient: "David Lee",
    patientId: "P10078",
    doctor: "Dr. Sarah Johnson",
    medications: [{ name: "Omeprazole", dosage: "20mg", quantity: 30 }],
    date: "2025-05-12",
    status: "On Hold",
    priority: "Normal",
  },
  {
    id: "RX10050",
    patient: "Jennifer Wilson",
    patientId: "P10056",
    doctor: "Dr. Michael Chen",
    medications: [{ name: "Loratadine", dosage: "10mg", quantity: 30 }],
    date: "2025-05-12",
    status: "Processing",
    priority: "Normal",
  },
  {
    id: "RX10051",
    patient: "Thomas Brown",
    patientId: "P10034",
    doctor: "Dr. Lisa Wong",
    medications: [{ name: "Amoxicillin", dosage: "500mg", quantity: 20 }],
    date: "2025-05-12",
    status: "Ready for Pickup",
    priority: "Urgent",
  },
  {
    id: "RX10052",
    patient: "Sarah Miller",
    patientId: "P10067",
    doctor: "Dr. James Wilson",
    medications: [
      { name: "Ibuprofen", dosage: "400mg", quantity: 30 },
      { name: "Omeprazole", dosage: "20mg", quantity: 30 },
    ],
    date: "2025-05-12",
    status: "Processing",
    priority: "Normal",
  },
]

export function PharmacyPrescriptionsTable() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search prescriptions..." className="w-[250px] pl-8" />
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
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
              <DropdownMenuItem>Doctor</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Link href="/pharmacy/prescriptions/dispense">
            <Button size="sm">
              <Package className="mr-2 h-4 w-4" />
              Dispense Medication
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Medications</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell className="font-medium">{prescription.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{prescription.patient}</div>
                    <div className="text-xs text-muted-foreground">{prescription.patientId}</div>
                  </div>
                </TableCell>
                <TableCell>{prescription.doctor}</TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="text-sm">
                        {med.name} {med.dosage} ({med.quantity}){index < prescription.medications.length - 1 && ", "}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{prescription.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      prescription.status === "Ready for Pickup"
                        ? "outline"
                        : prescription.status === "Processing"
                          ? "secondary"
                          : prescription.status === "Dispensed"
                            ? "default"
                            : "destructive"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {prescription.status === "Ready for Pickup" && <CheckCircle className="h-3 w-3" />}
                    {prescription.status === "Processing" && <Clock className="h-3 w-3" />}
                    {prescription.status === "On Hold" && <XCircle className="h-3 w-3" />}
                    {prescription.status === "Dispensed" && <Package className="h-3 w-3" />}
                    {prescription.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={prescription.priority === "Urgent" ? "destructive" : "outline"}>
                    {prescription.priority}
                  </Badge>
                </TableCell>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        Dispense
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Put On Hold
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
