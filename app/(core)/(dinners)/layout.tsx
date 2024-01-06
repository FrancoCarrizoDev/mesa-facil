import { DinnerNavbar } from "@components";
import React, { ReactNode } from "react";

export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="w-full min-h-screen   ">
      <DinnerNavbar />
      {children}
    </div>
  );
}
