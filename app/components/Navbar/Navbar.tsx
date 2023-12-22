import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

async function Navbar() {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    redirect("/");
  }

  return (
    <section className="bg-blue-chill-50 border-b-2 border-blue-chill-200">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-xl font-bold">MesaFacil</h1>
        <div className="flex items-center gap-3">
          <nav>
            <ul className="flex text-blue-chill-900 text-sm gap-3">
              <li>
                <Link href={"/private"}>Inicio</Link>
              </li>
              <li>
                <Link href={"/private/restaurants"}>Mis Restaurantes</Link>
              </li>
              <li>
                <Link href={"/private/reservs"}>Mis Reservas</Link>
              </li>
            </ul>
          </nav>
          <Image
            src={user?.picture}
            alt="MesaFacil"
            width={30}
            height={30}
            className="rounded-full"
          />
          <a className="text-xs" href="/api/auth/logout">
            Logout
          </a>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
