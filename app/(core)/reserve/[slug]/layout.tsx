import { DinnerNavbar } from "@/app/components";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen   ">
      <DinnerNavbar />
      {children}
    </div>
  );
}
