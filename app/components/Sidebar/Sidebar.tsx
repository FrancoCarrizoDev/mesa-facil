import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="bg-blue-chill-50 h-full border-r-2 border-blue-chill-200">
      <nav>
        <ul className="text-blue-chill-900 text-sm ps-3 pt-3">
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
    </aside>
  );
}
