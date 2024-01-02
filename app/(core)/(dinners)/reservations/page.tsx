import { getReservations } from "@/app/actions/reservation";
import { DinnerReservation } from "@/app/models/reservation.model";
import { getSession } from "@auth0/nextjs-auth0";
import React from "react";
import ReservationListContainer from "./ReservationListContainer";

export default async function Page() {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return (
      <div>
        <p>Debe estar logueado para ver esta página</p>
        <a href="/api/auth/login">Ingresar</a>
      </div>
    );
  }

  const reservations: DinnerReservation[] = await getReservations();

  return (
    <div className="p-5">
      <ReservationListContainer reservationList={reservations} />
    </div>
  );
}
