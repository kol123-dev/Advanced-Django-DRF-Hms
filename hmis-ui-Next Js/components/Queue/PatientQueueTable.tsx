// components/Queue/PatientQueueTable.tsx
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

// ✅ Import your new modal
import { ConfirmModal } from "@/components/ui/ConfirmModal";

// 🔁 Types
import type { QueueStatus, QueuePatient } from "@/lib/types/queue";

interface PatientQueueTableProps {
  patients: QueuePatient[];
  onUpdateStatus: (id: number, newStatus: QueueStatus) => void;
  onRemoveFromQueue: (id: number) => void;

  onUpdatePriority?: (
    id: number,
    newPriority: "Normal" | "Urgent" | "Emergency"
  ) => void;
  onTransferDepartment?: (id: number, newDepartment: string) => void;
}

export function PatientQueueTable({
  patients,
  onUpdateStatus,
  onRemoveFromQueue,
  onUpdatePriority,
  onTransferDepartment,
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
              {/* Existing cells unchanged */}
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

              {/* Actions Dropdown */}
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

                    {/* Start Treatment */}
                    {p.status === "Waiting" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Start Treatment"
                          description={`Are you sure you want to start treatment for ${p.name}?`}
                          onConfirm={() => onUpdateStatus(p.id, "In Progress")}
                          trigger={<span>Start Treatment</span>}
                        />
                      </DropdownMenuItem>
                    )}

                    {/* Complete Treatment */}
                    {p.status === "In Progress" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Complete Treatment"
                          description={`Are you sure you want to complete treatment for ${p.name}?`}
                          onConfirm={() => onUpdateStatus(p.id, "Completed")}
                          trigger={<span>Complete Treatment</span>}
                        />
                      </DropdownMenuItem>
                    )}

                    {/* Change Priority */}
                    <DropdownMenuLabel>Change Priority</DropdownMenuLabel>
                    {p.priority !== "Emergency" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Mark as Emergency"
                          description={`Are you sure you want to mark ${p.name} as Emergency?`}
                          onConfirm={() =>
                            onUpdatePriority?.(p.id, "Emergency")
                          }
                          confirmText="Mark Emergency"
                          cancelText="Cancel"
                          variant="destructive"
                          trigger={<span>🔴 Mark as Emergency</span>}
                        />
                      </DropdownMenuItem>
                    )}
                    {p.priority !== "Urgent" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Mark as Urgent"
                          description={`Are you sure you want to mark ${p.name} as Urgent?`}
                          onConfirm={() => onUpdatePriority?.(p.id, "Urgent")}
                          confirmText="Mark Urgent"
                          cancelText="Cancel"
                          trigger={<span>⚠️ Mark as Urgent</span>}
                        />
                      </DropdownMenuItem>
                    )}
                    {p.priority !== "Normal" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Mark as Normal"
                          description={`Are you sure you want to mark ${p.name} as Normal?`}
                          onConfirm={() => onUpdatePriority?.(p.id, "Normal")}
                          confirmText="Mark Normal"
                          cancelText="Cancel"
                          trigger={<span>✅ Mark as Normal</span>}
                        />
                      </DropdownMenuItem>
                    )}

                    {/* Transfer Department */}
                    <DropdownMenuLabel>Transfer Department</DropdownMenuLabel>
                    {p.department !== "Triage" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Transfer to Triage"
                          description={`Are you sure you want to move ${p.name} to Triage?`}
                          onConfirm={() =>
                            onTransferDepartment?.(p.id, "Triage")
                          }
                          confirmText="Transfer"
                          cancelText="Cancel"
                          variant="default"
                          trigger={<span>➡️ Triage</span>}
                        />
                      </DropdownMenuItem>
                    )}
                    {p.department !== "Cardiology" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Transfer to Cardiology"
                          description={`Are you sure you want to move ${p.name} to Cardiology?`}
                          onConfirm={() =>
                            onTransferDepartment?.(p.id, "Cardiology")
                          }
                          confirmText="Transfer"
                          cancelText="Cancel"
                          trigger={<span>➡️ Cardiology</span>}
                        />
                      </DropdownMenuItem>
                    )}
                    {p.department !== "Pharmacy" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Transfer to Pharmacy"
                          description={`Are you sure you want to move ${p.name} to Pharmacy?`}
                          onConfirm={() =>
                            onTransferDepartment?.(p.id, "Pharmacy")
                          }
                          confirmText="Transfer"
                          cancelText="Cancel"
                          trigger={<span>➡️ Pharmacy</span>}
                        />
                      </DropdownMenuItem>
                    )}
                    {p.department !== "Emergency" && (
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {}}
                      >
                        <ConfirmModal
                          title="Transfer to Emergency"
                          description={`Are you sure you want to move ${p.name} to Emergency?`}
                          onConfirm={() =>
                            onTransferDepartment?.(p.id, "Emergency")
                          }
                          confirmText="Transfer"
                          cancelText="Cancel"
                          variant="destructive"
                          trigger={<span>➡️ Emergency</span>}
                        />
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    {/* Remove from Queue */}
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => {}}
                      className="text-destructive"
                    >
                      <ConfirmModal
                        title="Remove from Queue"
                        description={`Are you sure you want to remove ${p.name} from the queue?`}
                        onConfirm={() => onRemoveFromQueue(p.id)}
                        confirmText="Remove"
                        cancelText="Cancel"
                        variant="destructive"
                        trigger={<span>Remove from Queue</span>}
                      />
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
