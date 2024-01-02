import { getReservationLabel } from "@/app/helpers/reservation-status.helper";
import { DinnerReservation } from "@/app/models/reservation.model";
import React from "react";
import QRCode from "react-qr-code";

export default function ReservationItem({
  reservation,
}: {
  reservation: DinnerReservation;
}) {
  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <p className="text-sm font-medium text-gray-900 truncate ">
            {reservation.attentionSchedule.restaurant.name}
          </p>
          <p className="text-sm font-medium text-gray-900 truncate ">
            {reservation.attentionSchedule.restaurant.address}
          </p>
        </div>
        <div className="flex-shrink-0 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate ">
            {new Date(reservation.date).toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {new Date(reservation.date).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            hs
          </p>
          <p className="text-sm text-gray-500 truncate ">
            {reservation.people} personas
          </p>
        </div>
        <div className="flex-shrink-0">
          <p className="text-sm text-gray-500">{reservation.message}</p>
        </div>
        <div className="inline-flex items-center font-semibold text-gray-900 ">
          {getReservationLabel(reservation.status.status)}d
        </div>
        <div className="flex-shrink-0">
          <p>Ver QR</p>
        </div>
      </div>
    </li>
  );
}
