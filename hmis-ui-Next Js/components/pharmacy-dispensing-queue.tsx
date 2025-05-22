import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

const dispensingQueue = [
  {
    id: "RX10045",
    patient: "John Smith",
    patientId: "P10023",
    waitTime: 12,
    medications: [
      { name: "Amoxicillin", dosage: "500mg", quantity: 30 },
      { name: "Ibuprofen", dosage: "400mg", quantity: 20 },
    ],
    status: "Ready for Pickup",
    priority: "Normal",
    initials: "JS",
  },
  {
    id: "RX10048",
    patient: "Maria Garcia",
    patientId: "P10102",
    waitTime: 8,
    medications: [{ name: "Albuterol", dosage: "90mcg", quantity: 1 }],
    status: "Ready for Pickup",
    priority: "Urgent",
    initials: "MG",
  },
  {
    id: "RX10051",
    patient: "Thomas Brown",
    patientId: "P10034",
    waitTime: 5,
    medications: [{ name: "Amoxicillin", dosage: "500mg", quantity: 20 }],
    status: "Ready for Pickup",
    priority: "Urgent",
    initials: "TB",
  },
  {
    id: "RX10046",
    patient: "Emily Davis",
    patientId: "P10045",
    waitTime: 15,
    medications: [{ name: "Lisinopril", dosage: "10mg", quantity: 60 }],
    status: "Processing",
    priority: "Normal",
    initials: "ED",
  },
  {
    id: "RX10052",
    patient: "Sarah Miller",
    patientId: "P10067",
    waitTime: 18,
    medications: [
      { name: "Ibuprofen", dosage: "400mg", quantity: 30 },
      { name: "Omeprazole", dosage: "20mg", quantity: 30 },
    ],
    status: "Processing",
    priority: "Normal",
    initials: "SM",
  },
]

export function PharmacyDispensingQueue() {
  return (
    <div className="space-y-4">
      {dispensingQueue.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between rounded-lg border p-3 ${
            item.priority === "Urgent" ? "border-red-200 bg-red-50" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{item.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.patient}</span>
                {item.priority === "Urgent" && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {item.id} | {item.patientId}
              </div>
              <div className="mt-1 text-sm">
                {item.medications.map((med, index) => (
                  <span key={index}>
                    {med.name} {med.dosage} ({med.quantity}){index < item.medications.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3" />
              <span>{item.waitTime} min</span>
            </div>
            <Badge
              variant={item.status === "Ready for Pickup" ? "outline" : "secondary"}
              className="flex items-center gap-1"
            >
              {item.status === "Ready for Pickup" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {item.status}
            </Badge>
            <div className="flex gap-2">
              {item.status === "Processing" ? (
                <Button size="sm" className="h-7 px-2 text-xs">
                  Complete
                </Button>
              ) : (
                <Button size="sm" className="h-7 px-2 text-xs">
                  Mark as Dispensed
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
