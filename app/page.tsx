import { cookies } from "next/headers";

export default async function Home() {
  // read loginRequired cookie
  const cookieStore = cookies();
  const loginRequired = cookieStore.get("loginRequired")?.value ?? false;
  const tokenExpired = cookieStore.get("tokenExpired")?.value ?? false;
  return (
    <main>
      <h1>Bievenido, ingrese sessión</h1>
      <a href="/api/auth/login">Login</a>
      {loginRequired && <p className="font-bold">Debe ingresar primero</p>}
      {tokenExpired && <p className="font-bold">Su sessión expiró</p>}
    </main>
  );
}
