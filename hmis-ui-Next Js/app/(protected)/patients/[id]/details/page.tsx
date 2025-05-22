"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 🔁 Hooks & Types
import { usePatientDetails } from "@/hooks/usePatientDetails";
import { usePatientVisits } from "@/hooks/usePatientVisits";
import type { Patient } from "@/lib/api/patient";
import type { Visit } from "@/lib/api/visit";

export default function PatientDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { patient, loading, error: patientError } = usePatientDetails(id);
  const {
    visits,
    loading: visitsLoading,
    error: visitsError,
  } = usePatientVisits(id);

  if (loading || !patient) {
    return <div>Loading...</div>;
  }

  if (patientError || visitsError) {
    return (
      <div className="p-6 text-red-500 bg-red-50 rounded-md border">
        <h2>Error</h2>
        <p>{patientError || visitsError}</p>
        <button onClick={() => router.back()} className="mt-4 underline">
          ← Go Back
        </button>
      </div>
    );
  }

  const fullName = `${patient.first_name} ${patient.last_name}`;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle>{fullName}</CardTitle>
          <CardDescription>
            Patient ID: {patient.id}, MRN: {patient.mrn}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Display patient info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Date of Birth:</strong>{" "}
              {new Date(patient.date_of_birth).toLocaleDateString()}
            </div>
            <div>
              <strong>Gender:</strong>{" "}
              {patient.gender === "M"
                ? "Male"
                : patient.gender === "F"
                ? "Female"
                : "Other"}
            </div>
            <div>
              <strong>Blood Group:</strong> {patient.blood_group}
            </div>
            <div>
              <strong>Age:</strong> {patient.age}
            </div>
            <div>
              <strong>Email:</strong> {patient.email}
            </div>
            <div>
              <strong>Phone:</strong> {patient.phone}
            </div>
            <div>
              <strong>Address:</strong> {patient.address}
            </div>
          </div>

          {/* Emergency Contact */}
          {patient.emergency_contact_name && (
            <>
              <h3 className="text-lg font-semibold mt-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <strong>Name:</strong> {patient.emergency_contact_name}
                </div>
                <div>
                  <strong>Phone:</strong> {patient.emergency_contact_phone}
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          {patient.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Notes</h3>
              <p>{patient.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visits Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Visit History</CardTitle>
              <CardDescription>
                List of visits made by this patient
              </CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/patients/${id}/new-visit`}>New Visit</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {visitsLoading ? (
            <p>Loading visits...</p>
          ) : visits.length === 0 ? (
            <div className="py-4 text-muted-foreground">
              <p>This patient has no visit history yet.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href={`/patients/${id}/new-visit`}>Start New Visit</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {visits.map((visit) => (
                <Card key={visit.id} className="bg-card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Visit #{visit.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Type: {visit.visit_type}, Status: {visit.status}
                      </p>
                      <p className="text-sm">
                        Start: {new Date(visit.start_time).toLocaleString()}
                      </p>
                      <p className="text-sm">
                        End:{" "}
                        {visit.end_time
                          ? new Date(visit.end_time).toLocaleString()
                          : "Ongoing"}
                      </p>
                      <p className="text-sm">
                        Reason: {visit.reason_for_visit || "Not specified"}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/visits/${visit.id}`}>View Visit</Link>
                    </Button>
                  </div>

                  {/* Vital Signs */}
                  <div className="mt-4">
                    <h4 className="font-medium">Vital Signs</h4>
                    {visit.vitals?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.vitals.map((vital) => (
                          <li key={vital.id}>
                            BP: {vital.systolic_bp}/{vital.diastolic_bp}, Temp:{" "}
                            {vital.temperature}°C
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No vitals recorded
                      </p>
                    )}
                  </div>

                  {/* Diagnoses */}
                  <div className="mt-4">
                    <h4 className="font-medium">Diagnosis</h4>
                    {visit.diagnoses?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.diagnoses.map((diag) => (
                          <li key={diag.id}>{diag.condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No diagnosis recorded
                      </p>
                    )}
                  </div>

                  {/* Prescriptions */}
                  <div className="mt-4">
                    <h4 className="font-medium">Prescriptions</h4>
                    {visit.prescriptions?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.prescriptions.map((presc) => (
                          <li key={presc.id}>
                            Drug ID: {presc.drug}, Dosage: {presc.dosage}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No prescriptions
                      </p>
                    )}
                  </div>

                  {/* Lab Orders */}
                  <div className="mt-4">
                    <h4 className="font-medium">Lab Tests</h4>
                    {visit.lab_orders?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.lab_orders.map((order) => (
                          <li key={order.id}>
                            Test ID: {order.test_type}, Status: {order.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No lab orders
                      </p>
                    )}
                  </div>

                  {/* Radiology Orders */}
                  <div className="mt-4">
                    <h4 className="font-medium">Radiology</h4>
                    {visit.radiology_orders?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.radiology_orders.map((rad) => (
                          <li key={rad.id}>
                            Radiology ID: {rad.radiology_type}, Status:{" "}
                            {rad.completed_at ? "Completed" : "Pending"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No radiology orders
                      </p>
                    )}
                  </div>

                  {/* Procedures */}
                  <div className="mt-4">
                    <h4 className="font-medium">Procedures</h4>
                    {visit.procedures?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.procedures.map((proc) => (
                          <li key={proc.id}>
                            {proc.name} — Performed:{" "}
                            {new Date(proc.performed_at).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No procedures performed
                      </p>
                    )}
                  </div>

                  {/* Referrals */}
                  <div className="mt-4">
                    <h4 className="font-medium">Referrals</h4>
                    {visit.referrals?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.referrals.map((referral) => (
                          <li key={referral.id}>
                            To: {referral.to_location}, Reason:{" "}
                            {referral.reason}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No referrals
                      </p>
                    )}
                  </div>

                  {/* Follow-ups */}
                  <div className="mt-4">
                    <h4 className="font-medium">Follow-ups</h4>
                    {visit.followups?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.followups.map((followup) => (
                          <li key={followup.id}>
                            Scheduled:{" "}
                            {new Date(followup.scheduled_for).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No follow-ups
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="mt-4">
                    <h4 className="font-medium">Visit Notes</h4>
                    {visit.notes_list?.length > 0 ? (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {visit.notes_list.map((note) => (
                          <li key={note.id}>{note.title}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No notes recorded
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
