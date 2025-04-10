"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCalendar from "./components/AppointmentCalendar";

function AppointmentsPage() {
  // Fetch the user's Appointments
  const { data: appointments, isLoading: loading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await axios.get("/api/data/appointments");

      return response.data.appointments;
    },
  });

  console.log("Appointments: ", appointments);

  return (
    <section className="p-4 md:p-8 w-full">
      <article className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="heading">Appointments</h2>
      </article>

      <Tabs className="mt-8" defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          {/* Appointments table */}
          {loading ? (
            <Skeleton className="w-full h-[300px] mt-4 bg-slate-200 rounded-xl" />
          ) : (
            <Card className="mt-8">
              <CardContent>
                <Table>
                  <TableCaption>
                    A list of all of your appointments
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="md:text-xl font-medium text-slate-500">
                      <TableHead>Client Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment: Appointment) => (
                      <TableRow>
                        <TableCell>{appointment.clientName}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>
                          {formatDate(appointment.date, "yyyy-MM-dd")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {appointment.service}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="calendar">
          <AppointmentCalendar />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default AppointmentsPage;
