import { Navbar } from "@/app/components";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full p-5">{children}</main>
    </div>
  );
}
