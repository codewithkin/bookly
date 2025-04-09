import Topbar from "@/components/ui/shared/Topbar";
import React, { ReactNode } from "react";

function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}

export default DashboardLayout;
