import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function DinnerNavbar() {
  const { user } = (await getSession()) ?? {};

  return (
    <div className="text-center pt-5">
      {user ? (
        <>
          <p>Llevas acumulado 5 puntos</p>
          <Link href="/api/auth/logout?redirectTo=/reserve/mitica">Salir </Link>
        </>
      ) : (
        <Link href="/api/auth/login?redirectTo=/reserve/mitica">
          🎁 Ingresá para participar por beneficios y sorteos 🎁
        </Link>
      )}
    </div>
  );
}
