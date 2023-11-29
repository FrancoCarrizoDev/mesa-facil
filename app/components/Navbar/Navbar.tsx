import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

async function Navbar() {
  const { user } = (await getSession()) ?? {};
  console.log({ user });
  return (
    <section className="bg-blue-chill-50 border-b-2 border-blue-chill-200">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">MesaFacil</h1>
        <div className="flex items-center gap-3">
          <Image
            src={user?.picture}
            alt="MesaFacil"
            width={40}
            height={40}
            className="rounded-full"
          />
          <a href="/api/auth/logout">Logout</a>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
