import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  condition: string
  status: "Admitted" | "Discharged" | "Emergency" | "Outpatient"
  avatar: string
  timestamp: string
}

const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Emma Johnson",
    age: 45,
    gender: "Female",
    condition: "Pneumonia",
    status: "Admitted",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "2 hours ago",
  },
  {
    id: "P-1002",
    name: "Michael Chen",
    age: 32,
    gender: "Male",
    condition: "Fractured Arm",
    status: "Emergency",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "4 hours ago",
  },
  {
    id: "P-1003",
    name: "Sophia Williams",
    age: 28,
    gender: "Female",
    condition: "Pregnancy Checkup",
    status: "Outpatient",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "6 hours ago",
  },
  {
    id: "P-1004",
    name: "Robert Garcia",
    age: 67,
    gender: "Male",
    condition: "Heart Disease",
    status: "Admitted",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "10 hours ago",
  },
  {
    id: "P-1005",
    name: "Olivia Brown",
    age: 8,
    gender: "Female",
    condition: "Tonsillitis",
    status: "Discharged",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "12 hours ago",
  },
]

export function RecentPatients() {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div key={patient.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
          <Avatar>
            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
            <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{patient.name}</p>
              <Badge
                variant={
                  patient.status === "Admitted"
                    ? "default"
                    : patient.status === "Emergency"
                      ? "destructive"
                      : patient.status === "Discharged"
                        ? "outline"
                        : "secondary"
                }
                className="text-[10px] px-1.5 py-0"
              >
                {patient.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {patient.age} yrs, {patient.gender} - {patient.condition}
              </p>
              <span className="text-[10px] text-muted-foreground">{patient.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
