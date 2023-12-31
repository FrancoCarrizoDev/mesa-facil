import ReservationItem from "@/app/components/Reservations/ReservationItem";
import { DinnerReservation } from "@/app/models/reservation.model";
import React from "react";
import QRCode from "react-qr-code";

export default function ReservationListContainer({
  reservationList,
}: {
  reservationList: DinnerReservation[];
}) {
  return (
    <ul className="w-full divide-y divide-gray-200">
      {reservationList.map((reservation) => (
        <ReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </ul>
  );
}
