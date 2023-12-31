import { DinnerReservation } from "@/app/models/reservation.model";
import React from "react";
import QRCode from "react-qr-code";

export default function ReservationItem({
  reservation,
}: {
  reservation: DinnerReservation;
}) {
  console;
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <p>
            {reservation.attentionSchedule.restaurant.name} -{" "}
            {reservation.attentionSchedule.restaurant.address}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">
            Fecha {new Date(reservation.date).toLocaleDateString("es-AR")} a las{" "}
            {new Date(reservation.date).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            hs
          </p>
          <p className="text-sm text-gray-500 truncate ">
            Cantidad de personas: {reservation.people}
          </p>
          d
        </div>
        <div className="inline-flex items-center font-semibold text-gray-900 ">
          Estado de reserva: {reservation.status.status}
        </div>
        <div className="flex-shrink-0">
          <p>Ver QR</p>
        </div>
      </div>
    </li>
  );
}
