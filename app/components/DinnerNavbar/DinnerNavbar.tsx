"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DinnerNavbar() {
  const { user } = useUser();
  const redirectTo = usePathname();

  return (
    <section className="bg-lemon-200 border-b-2 border-lemon-200">
      <div className="flex justify-around items-center p-2">
        <h1 className="text-xl font-bold">MesaFacil</h1>
        <div className="flex items-center">
          <nav className="pe-3">
            <ul className="flex items-center text-blue-chill-900 text-xs gap-3">
              <li>
                <Link href={"/reservs"}>Mis Reservas</Link>
              </li>
              {user ? (
                <li className="flex gap-3 items-center">
                  <Image
                    src={user?.picture ?? ""}
                    alt="MesaFacil"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <Link
                    className="text-xs"
                    href={`/api/auth/logout?redirectTo=${redirectTo}`}
                  >
                    Salir
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-xs font-semibold"
                    href={`/api/auth/login?redirectTo=${redirectTo}`}
                  >
                    Ingresar
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
