import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { StaffTable } from "@/components/staff-table"

// Mock data for different staff types
const staffCategories = [
  {
    id: "doctors",
    title: "Doctors",
    description: "Manage all doctors in the hospital",
    count: 24,
  },
  {
    id: "nurses",
    title: "Nurses",
    description: "Manage all nurses in the hospital",
    count: 42,
  },
  {
    id: "receptionists",
    title: "Receptionists",
    description: "Manage all receptionists in the hospital",
    count: 8,
  },
  {
    id: "clinical-officers",
    title: "Clinical Officers",
    description: "Manage all clinical officers in the hospital",
    count: 15,
  },
  {
    id: "lab-technicians",
    title: "Lab Technicians",
    description: "Manage all lab technicians in the hospital",
    count: 12,
  },
  {
    id: "pharmacists",
    title: "Pharmacists",
    description: "Manage all pharmacists in the hospital",
    count: 10,
  },
  {
    id: "radiologists",
    title: "Radiologists",
    description: "Manage all radiologists in the hospital",
    count: 6,
  },
  {
    id: "dentists",
    title: "Dentists",
    description: "Manage all dentists in the hospital",
    count: 8,
  },
]

export default function StaffPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
        <Link href="/staff/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>View and manage all hospital staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="doctors" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between mb-2">
                <TabsList className="flex w-full overflow-x-auto snap-x scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted/20 p-1 bg-muted/30 rounded-lg">
                  {staffCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex-shrink-0 snap-start px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm whitespace-nowrap text-sm font-medium transition-all"
                    >
                      {category.title}
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground">
                        {category.count}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search staff..." className="w-full pl-8 bg-background" />
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>

            {staffCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <Link href={`/staff/add?type=${category.id}`}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add {category.title.slice(0, -1)}
                    </Button>
                  </Link>
                </div>
                <StaffTable staffType={category.id} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
