import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const loginRequired = cookieStore.get("loginRequired")?.value ?? false;
  const tokenExpired = cookieStore.get("tokenExpired")?.value ?? false;

  return (
    <main className="min-h-screen bg-blue-chill-200 grid place-content-center">
      <div className="flex flex-col bg-white border border-blue-chill-400 rounded-md p-5">
        <h1>Bievenido, ingrese sessión</h1>
        <a href="/api/auth/login">Login</a>
        {loginRequired && <p className="font-bold">Debe ingresar primero</p>}
        {tokenExpired && <p className="font-bold">Su sessión expiró</p>}
      </div>
    </main>
  );
}
