"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface DepartmentQueueCardProps {
  name: string;
  waiting: number;
  avgWait: number;
}

export function DepartmentQueueCard({
  name,
  waiting,
  avgWait,
}: DepartmentQueueCardProps) {
  const bgColor =
    avgWait > 30
      ? "bg-destructive"
      : avgWait > 15
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="font-medium">{name}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {waiting} patients
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-2 rounded-full bg-muted">
          <div
            className={`h-2 rounded-full ${bgColor}`}
            style={{ width: `${avgWait > 0 ? 100 : 0}%` }}
          ></div>
        </div>
        <span className="text-xs text-right block mt-1">
          {waiting > 0 ? `${avgWait} min` : "No wait"}
        </span>
      </CardContent>
    </Card>
  );
}
