import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Invoice {
  id: string
  patientName: string
  patientAvatar: string
  date: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
  service: string
}

const invoices: Invoice[] = [
  {
    id: "INV-1001",
    patientName: "Emma Johnson",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-12",
    amount: 450.0,
    status: "Paid",
    service: "Cardiology Consultation",
  },
  {
    id: "INV-1002",
    patientName: "Michael Chen",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-15",
    amount: 2500.0,
    status: "Pending",
    service: "Orthopedic Surgery",
  },
  {
    id: "INV-1003",
    patientName: "Sophia Williams",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-10",
    amount: 350.0,
    status: "Paid",
    service: "Obstetrics Checkup",
  },
  {
    id: "INV-1004",
    patientName: "Robert Garcia",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-08",
    amount: 175.0,
    status: "Overdue",
    service: "Lab Tests",
  },
  {
    id: "INV-1005",
    patientName: "Olivia Brown",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-05",
    amount: 120.0,
    status: "Paid",
    service: "Pediatric Consultation",
  },
  {
    id: "INV-1006",
    patientName: "William Taylor",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-14",
    amount: 225.0,
    status: "Pending",
    service: "Neurology Consultation",
  },
  {
    id: "INV-1007",
    patientName: "Ava Martinez",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "2023-05-01",
    amount: 3200.0,
    status: "Paid",
    service: "Appendectomy Surgery",
  },
]

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <Link href="/billing/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>View and manage all patient invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search invoices..." className="w-full pl-8 bg-background" />
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={invoice.patientAvatar || "/placeholder.svg"} alt={invoice.patientName} />
                            <AvatarFallback>{invoice.patientName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{invoice.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Invoice</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
