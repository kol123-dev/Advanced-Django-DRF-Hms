//patients/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";

function getLastVisitDate(visits: Visit[] | undefined): string {
  if (!visits || visits.length === 0) return "Never";
  const latest = visits.reduce((a, b) =>
    new Date(b.start_time) > new Date(a.start_time) ? b : a
  );
  return new Date(latest.start_time).toLocaleDateString();
}

function getVisitStatus(visits: Visit[] | undefined): string {
  if (!visits || visits.length === 0) return "Discharged";
  const latest = visits.reduce((a, b) =>
    new Date(b.start_time) > new Date(a.start_time) ? b : a
  );
  switch (latest.status) {
    case "in_progress":
      return "Active";
    case "referred":
      return "Referred";
    case "completed":
    case "discharged":
      return "Discharged";
    case "scheduled":
      return "Scheduled";
    default:
      return "Unknown";
  }
}

// 🔁 Types
import type { Patient, Visit } from "@/lib/api/patient";

// 🔁 API
import { getAllPatients } from "@/lib/api/patient";
import { getPatientVisits } from "@/lib/api/visit";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const patientList = await getAllPatients(); // GET /api/patients/
        const updatedPatients = await Promise.all(
          patientList.map(async (patient) => {
            const visits = await getPatientVisits(patient.id.toString()); // GET /api/visits/?patient=ID
            const sorted = visits.sort(
              (a, b) =>
                new Date(b.start_time).getTime() -
                new Date(a.start_time).getTime()
            );
            return {
              ...patient,
              visits: sorted,
            };
          })
        );
        setPatients(updatedPatients);
      } catch (err) {
        console.error("Error loading patients", err);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredPatients = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Link href="/patients/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Management</CardTitle>
          <CardDescription>View and manage all patient records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 bg-background"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => {
                  // 📆 Get latest visit
                  const sortedVisits = [...(patient.visits || [])].sort(
                    (a, b) =>
                      new Date(b.start_time).getTime() -
                      new Date(a.start_time).getTime()
                  );
                  const latestVisit = sortedVisits[0];

                  // 🟢 Status mapping logic
                  const getStatusFromLatestVisit = () => {
                    if (!latestVisit) return "Discharged";
                    switch (latestVisit.status) {
                      case "in_progress":
                        return "Active";
                      case "referred":
                        return "Referred";
                      case "discharged":
                        return "Discharged";
                      case "completed":
                        return "Discharged";
                      case "scheduled":
                        return "Scheduled";
                      default:
                        return "Unknown";
                    }
                  };

                  const status = getStatusFromLatestVisit();
                  const lastVisitDate = latestVisit
                    ? new Date(latestVisit.start_time).toLocaleDateString()
                    : "Never";

                  return (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">
                              {patient.first_name} {patient.last_name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {patient.age} yrs,{" "}
                              {patient.gender === "M"
                                ? "Male"
                                : patient.gender === "F"
                                ? "Female"
                                : "Other"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.phone}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {patient.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            status === "Active"
                              ? "default"
                              : status === "Referred"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lastVisitDate}</TableCell>
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
                              <Link href={`/patients/${patient.id}/new-visit`}>
                                New Visit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/patients/${patient.id}/details`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/patients/${patient.id}/edit`}>
                                Edit Patient
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                alert("Delete functionality coming soon")
                              }
                            >
                              Delete Patient
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
