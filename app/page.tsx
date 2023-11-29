import Link from "next/link";
import { cookies } from "next/headers";
import prisma from "../lib/prisma";

export default async function Home() {
  // read loginRequired cookie
  const cookieStore = cookies();
  const loginRequired = cookieStore.get("loginRequired")?.value ?? false;
  const data = await prisma.user.findMany();
  console.log({ data });
  return (
    <main>
      <h1>Bievenido, ingrese sessión</h1>
      <a href="/api/auth/login">Login</a>
      {loginRequired && <p className="font-bold">Debe ingresar primero</p>}
    </main>
  );
}
