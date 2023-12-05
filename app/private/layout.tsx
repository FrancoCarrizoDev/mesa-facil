import { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Loading from "./restaurants/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex h-full">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <main className="w-full p-5">{children}</main>
      </div>
    </div>
  );
}
