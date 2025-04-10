"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    </section>
  );
}

export default AppointmentsPage;
