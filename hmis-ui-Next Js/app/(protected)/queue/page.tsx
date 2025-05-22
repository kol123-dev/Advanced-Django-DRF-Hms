"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";

// 🧱 Components
import { PatientQueueTable } from "@/components/Queue/PatientQueueTable";
import { DepartmentQueueCard } from "@/components/Queue/DepartmentQueueCard";

// 📡 API
import {
  getQueuePatients,
  updateQueueEntry,
  deleteQueueEntry,
  QueueStatus,
} from "@/lib/api/queue";

// 🔁 Types
import type { QueuePatient } from "@/lib/api/queue";

export default function QueuePage() {
  const [patients, setPatients] = useState<QueuePatient[]>([]);
  const [loading, setLoading] = useState(true);

  // Load queue patients with patient details
  useEffect(() => {
    async function loadQueueData() {
      try {
        const data = await getQueuePatients(); // GET /api/queue/
        setPatients(data);
      } catch (err) {
        console.error("Error loading queue", err);
      } finally {
        setLoading(false);
      }
    }

    loadQueueData();
  }, []);

  useEffect(() => {
    const updateQueueStatus = async (id: number, newStatus: QueueStatus) => {
      const success = await updateQueueEntry(id.toString(), {
        status: newStatus,
        ...(newStatus === "In Progress" && {
          start_time: new Date().toISOString(),
        }),
        ...(newStatus === "Completed" && {
          end_time: new Date().toISOString(),
        }),
      });

      if (!success) {
        alert("❌ Failed to update queue status");
      }
    };

    // You can expose this via context or state if needed
  }, []);

  if (loading) return <div>Loading...</div>;

  // Summary stats based on current queue
  const summary = {
    totalWaiting: patients.filter((p) => p.status === "Waiting").length,
    averageWaitTime: Math.round(
      patients
        .filter((p) => p.status === "Waiting")
        .reduce((acc, p) => acc + p.waitTime, 0) /
        (patients.filter((p) => p.status === "Waiting").length || 1)
    ),
    emergencyCases: patients.filter((p) => p.priority === "Emergency").length,
    completedToday: patients.filter((p) => p.status === "Completed").length,
  };

  const departmentQueues = [
    { name: "Triage", waiting: 3, avgWait: 10 },
    { name: "Consultation R1", waiting: 4, avgWait: 25 },
    { name: "Orthopedics", waiting: 2, avgWait: 15 },
    { name: "Lab", waiting: 5, avgWait: 20 },
    { name: "Pharmacy", waiting: 6, avgWait: 12 },
    { name: "Dental", waiting: 2, avgWait: 30 },
    { name: "Eye Clinic", waiting: 3, avgWait: 22 },
  ];

  // Update status (Waiting → In Progress → Completed)
  const handleStatusChange = (id: number, newStatus: QueueStatus) => {
    updateQueueEntry(id.toString(), {
      status: newStatus,
      ...(newStatus === "In Progress" && {
        start_time: new Date().toISOString(),
      }),
      ...(newStatus === "Completed" && {
        end_time: new Date().toISOString(),
      }),
    });

    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  // Remove patient from queue
  const handleRemoveFromQueue = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this patient from queue?"
    );
    if (!confirmDelete) return;

    const success = await deleteQueueEntry(id.toString());
    if (success) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("❌ Failed to remove patient from queue");
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
            <Input
              placeholder="Search patients in queue..."
              className="w-1/4"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
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
                patients={patients}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            </TabsContent>

            <TabsContent value="waiting" className="space-y-4">
              <PatientQueueTable
                patients={patients.filter((p) => p.status === "Waiting")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              <PatientQueueTable
                patients={patients.filter((p) => p.status === "In Progress")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <PatientQueueTable
                patients={patients.filter((p) => p.status === "Completed")}
                onUpdateStatus={handleStatusChange}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
