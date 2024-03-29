import { getReservationLabelStatus } from "@helpers";
import { ReservationItemDTO, ReservationStatus } from "@models";
import Link from "next/link";
import React from "react";

export default function DinnerReservationItem({
  reservation,
}: {
  readonly reservation: ReservationItemDTO;
}) {
  return (
    <li className="py-2 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <p className="text-sm font-medium text-gray-900 ">
            {reservation.attentionSchedule.restaurant.name}
          </p>
        </div>
        <div className="flex-shrink-0 min-w-0">
          <p className="text-sm font-medium text-gray-900 ">
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
        </div>
        <div className="flex-shrink-0">
          <p className="text-sm text-gray-500 truncate ">
            {reservation.people} personas
          </p>
        </div>
        <div className="inline-flex items-center font-semibold text-gray-900 ">
          {getReservationLabelStatus(reservation.status.id)}
        </div>

        <div className="flex-shrink-0">
          {reservation.status.id === ReservationStatus.CREATED ? (
            <p className="text-md">QR no disponible</p>
          ) : (
            <Link href={`/reservations/${reservation.id}`}>Ver QR</Link>
          )}
        </div>
      </div>
    </li>
  );
}
