import Topbar from "@/components/ui/shared/Topbar";
import React, { ReactNode } from "react";

function BookingsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}

export default BookingsLayout;
