"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
          <Badge variant="outline">{waiting} patients</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Progress value={waiting > 0 ? 100 : 0} indicatorClassName={bgColor} />
      </CardContent>
      <CardFooter className="justify-end">
        <span className="text-xs">
          {waiting > 0 ? `${avgWait} min avg` : "No wait"}
        </span>
      </CardFooter>
    </Card>
  );
}
