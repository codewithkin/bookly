"use client";
import {
  CalendarCheck,
  Bell,
  UserRound,
  Settings as SettingsIcon,
  Briefcase,
  Link,
  Plus,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import MonthlyOverview from "./components/charts/MonthlyOverview";
import Appointments from "./components/Appointments";
import { Button } from "@/components/ui/button";

function Dashboard() {
  // Get the user's data
  const { data, isLoading: loading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axios.get("/api/data");

      return res.data;
    },
  });

  const [cards, setCards] = useState<any>([]);

  const generateCards = (user: any) => [
    {
      heading: "Appointments",
      icon: CalendarCheck,
      number: user.appointments.length,
    },
    {
      heading: "Notifications",
      icon: Bell,
      number: user.notifications.length,
    },
    {
      heading: "Clients",
      icon: UserRound,
      number: user.clients.length,
    },
    {
      heading: "Services",
      icon: Briefcase,
      number: user.services.length,
    },
  ];

  useEffect(() => {
    if (!loading) {
      setCards(generateCards(data));
    }
  }, [data]);

  return (
    <section className="p-4 md:p-8 w-full">
      <article className="flex flex-col gap-4 md:flex-row justify-between">
        <h2 className="heading">Dashboard</h2>

        <article className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Quick action buttons */}
          <Button size="lg">
            Share Link
            <Link />
          </Button>

          <Button size="lg" variant="secondary">
            New Appointment
            <Plus />
          </Button>

          <Button size="lg" variant="secondary">
            New Service
            <Plus />
          </Button>
        </article>
      </article>

      {/* Data cards */}
      {loading ? (
        <article className="grid gap-4 md:gap-4 sm:grid-cols-2 md:grid-cols-4 items-center justify-center w-full">
          {[0, 1, 2, 3].map((_, index: number) => (
            <Skeleton key={index} className="w-full bg-slate-200" />
          ))}
        </article>
      ) : (
        <article className="grid gap-4 md:gap-4 sm:grid-cols-2 md:grid-cols-4 w-full mt-8">
          {cards.map((card: any, index: number) => (
            <motion.article
              initial={{
                opacity: 0,
              }}
              key={index}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.8,
              }}
              className="w-full"
            >
              <Card className="w-full border border-primary">
                <CardContent className="w-full flex flex-col gap-4">
                  <article className="flex flex-col gap-2">
                    <article className="rounded-full bg-gradient-to-tr from-purple-500 w-fit p-4 text-white to-primary">
                      <card.icon className="w-8 h-8" />
                    </article>
                    <CardTitle className="font-semibold">
                      {card.heading}
                    </CardTitle>
                  </article>

                  <h3 className="text-4xl font-medium text-slate-500">
                    {card.number}
                  </h3>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </article>
      )}

      {/* 4 column grid */}
      <article className="grid gap-4 md:grid-cols-4 mt-8">
        {/* Monthly Overview */}
        {loading ? (
          <Skeleton className="rounded-lg w-full md:col-span-3 bg-slate-200" />
        ) : (
          <MonthlyOverview appointments={data.appointments} />
        )}

        {loading ? (
          <Skeleton className="rounded-lg w-full md:col-span-1 bg-slate-200" />
        ) : (
          <Appointments appointments={data.appointments} />
        )}
      </article>
    </section>
  );
}

export default Dashboard;
