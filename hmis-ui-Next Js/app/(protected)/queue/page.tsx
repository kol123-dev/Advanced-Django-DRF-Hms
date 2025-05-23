// app/(protected)/queue/page.tsx
"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";

// 🧱 Components
import { PatientQueueTable } from "@/components/Queue/PatientQueueTable";
import { DepartmentQueueCard } from "@/components/Queue/DepartmentQueueCard";

// 🎯 Hook
import { useQueue } from "@/hooks/useQueue";

// 🔁 Types
import type { QueuePatient, QueueStatus } from "@/lib/types/queue";

export default function QueuePage() {
  const {
    queue,
    loading,
    error,
    stats,
    refetch,

    addToQueue,
    updateQueueStatus,
    removeQueueEntry,

    // ✨ Destructure new actions
    updatePriority,
    transferDepartment,
  } = useQueue();

  const [tab, setTab] = useState("all");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // ✅ Summary based on backend stats
  const summary = {
    totalWaiting: stats?.by_status.Waiting || 0,
    averageWaitTime: stats?.average_wait_time_minutes || 0,
    emergencyCases: stats?.by_priority.Emergency || 0,
    completedToday: stats?.by_status.Completed || 0,
  };

  // ✅ Convert stats.by_department to array for cards
  const departmentQueues = Object.entries(stats?.by_department || {}).map(
    ([name, waiting]) => ({
      name,
      waiting,
      avgWait: 0, // Placeholder — later you can calculate per department
    })
  );

  // ✏️ Handle status change (e.g., Waiting → In Progress → Completed)
  const handleStatusChange = async (id: number, newStatus: QueueStatus) => {
    const confirm = window.confirm(
      `Are you sure you want to set status to "${newStatus}"?`
    );
    if (!confirm) return;

    const success = await updateQueueStatus(id.toString(), {
      status: newStatus,
      ...(newStatus === "In Progress" && {
        start_time: new Date().toISOString(),
      }),
      ...(newStatus === "Completed" && { end_time: new Date().toISOString() }),
    });

    if (!success) {
      alert("❌ Failed to update status");
    }
  };

  // 🗑 Remove patient from queue
  const handleRemoveFromQueue = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this patient?"
    );
    if (!confirm) return;

    const success = await removeQueueEntry(id.toString());
    if (!success) {
      alert("❌ Failed to remove patient");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Queue Management</h1>
        <Link href="/queue/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add to Queue
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Patients Waiting */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Patients Waiting
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalWaiting}</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>

        {/* Average Wait Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Wait Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.averageWaitTime} min
            </div>
            <p className="text-xs text-muted-foreground">
              Current average time
            </p>
          </CardContent>
        </Card>

        {/* Emergency Cases */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Emergency Cases
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.emergencyCases}</div>
            <p className="text-xs text-muted-foreground">
              Currently in treatment
            </p>
          </CardContent>
        </Card>

        {/* Completed Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.completedToday}</div>
            <p className="text-xs text-muted-foreground">Patients seen today</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Queue Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Patient Queue</CardTitle>
              <CardDescription>
                Manage patients currently in the waiting queue
              </CardDescription>
            </div>
            <Input placeholder="Search patients..." className="w-1/4" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="waiting">Waiting</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              <PatientQueueTable
                patients={queue}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
                onUpdatePriority={(id, newPriority) =>
                  updatePriority(id.toString(), newPriority)
                }
                onTransferDepartment={(id, newDepartment) =>
                  transferDepartment(id.toString(), newDepartment)
                }
              />
            </TabsContent>

            <TabsContent value="waiting" className="space-y-4">
              <PatientQueueTable
                patients={queue.filter((p) => p.status === "Waiting")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
                onUpdatePriority={(id, newPriority) =>
                  updatePriority(id.toString(), newPriority)
                }
                onTransferDepartment={(id, newDepartment) =>
                  transferDepartment(id.toString(), newDepartment)
                }
              />
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              <PatientQueueTable
                patients={queue.filter((p) => p.status === "In Progress")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
                onUpdatePriority={(id, newPriority) =>
                  updatePriority(id.toString(), newPriority)
                }
                onTransferDepartment={(id, newDepartment) =>
                  transferDepartment(id.toString(), newDepartment)
                }
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <PatientQueueTable
                patients={queue.filter((p) => p.status === "Completed")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
                onUpdatePriority={(id, newPriority) =>
                  updatePriority(id.toString(), newPriority)
                }
                onTransferDepartment={(id, newDepartment) =>
                  transferDepartment(id.toString(), newDepartment)
                }
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Department Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Department Queues</CardTitle>
          <CardDescription>
            Current waiting status by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departmentQueues.map((dept) => (
              <DepartmentQueueCard key={dept.name} {...dept} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
