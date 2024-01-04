import ReservationItem from "@/app/components/Reservations/ReservationItem";
import { DinnerReservation } from "@/app/models/reservation.model";
import React from "react";
import QRCode from "react-qr-code";

export default function ReservationListContainer({
  reservationList,
}: {
  reservationList: DinnerReservation[];
}) {
  console.log({ reservationList: JSON.stringify(reservationList) });
  return (
    <div>
      <div className="flex flex-col">
        <h4 className="text-2xl font-semibold">Mis Reservas</h4>
        <hr />
      </div>
      <ul className="pt-3 overflow-x-auto divide-y divide-gray-200">
        {reservationList.map((reservation) => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </div>
  );
}
