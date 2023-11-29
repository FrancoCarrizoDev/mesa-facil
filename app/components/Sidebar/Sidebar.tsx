import React from "react";

export default function Sidebar() {
  return (
    <aside className="bg-blue-chill-50 h-full border-r-2 border-blue-chill-200">
      <nav>
        <ul className="text-blue-chill-950 ps-3 pt-3">
          <li>Dashboard</li>
          <li>Reservations</li>
        </ul>
      </nav>
    </aside>
  );
}
