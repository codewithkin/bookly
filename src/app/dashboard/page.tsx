"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Dashboard() {
  // Get the user's data
  const { data, isLoading: loading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axios.get("/api/data");

      return res.data;
    },
  });

  console.log("User data: ", data);

  return <section></section>;
}

export default Dashboard;
