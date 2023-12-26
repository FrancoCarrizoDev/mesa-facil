import { DinnerNavbar } from "@/app/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-white ">
      <DinnerNavbar />
      {children}
    </div>
  );
}
