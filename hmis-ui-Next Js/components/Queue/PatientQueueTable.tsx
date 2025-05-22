"use client";

import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowRightCircle, MoreHorizontal } from "lucide-react";

// 🔁 Types
import type { QueueStatus, QueuePatient } from "@/lib/api/queue";

interface PatientQueueTableProps {
  patients: QueuePatient[];
  onUpdateStatus: (id: number, newStatus: QueueStatus) => void;
  onRemoveFromQueue: (id: number) => void;
}

export function PatientQueueTable({
  patients,
  onUpdateStatus,
  onRemoveFromQueue,
}: PatientQueueTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Wait Time</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={p.avatar || "/placeholder.svg"}
                      alt={p.name}
                    />
                    <AvatarFallback>{p.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Arrived: {p.arrivalTime}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{p.department}</TableCell>
              <TableCell>{p.doctor}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    p.priority === "Emergency"
                      ? "destructive"
                      : p.priority === "Urgent"
                      ? "default"
                      : "outline"
                  }
                >
                  {p.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="flex w-fit items-center gap-1"
                >
                  {p.status === "In Progress" && (
                    <ArrowRightCircle className="h-3 w-3" />
                  )}
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell>{p.waitTime} min</TableCell>
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

                    <DropdownMenuItem asChild>
                      <Link href={`/patients/${p.id}/details`}>
                        View Patient
                      </Link>
                    </DropdownMenuItem>

                    {p.status === "Waiting" && (
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(p.id, "In Progress")}
                      >
                        Start Treatment
                      </DropdownMenuItem>
                    )}

                    {p.status === "In Progress" && (
                      <DropdownMenuItem
                        onClick={() => onUpdateStatus(p.id, "Completed")}
                      >
                        Complete Treatment
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem onClick={() => alert("Change Priority")}>
                      Change Priority
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => alert("Transfer Department")}
                    >
                      Transfer Department
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onRemoveFromQueue(p.id)}
                    >
                      Remove from Queue
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
