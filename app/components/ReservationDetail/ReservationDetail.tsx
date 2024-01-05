"use client";

import QRCode from "react-qr-code";
import { Button } from "..";
import { ReservationByID } from "@/app/models/reservation";

export default function ReservationDetail({
  reservation,
}: {
  readonly reservation: ReservationByID;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <QRCode value={reservation.id} size={256} />
      <p className="mt-4 text-md font-medium text-gray-600">
        {reservation.attentionSchedule.restaurant.name}
      </p>
      <p className="mt-4 text-sm text-gray-600 capitalize">
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
      <p className="mt-4 text-sm text-gray-600">
        {reservation.people} personas
      </p>
      <p className="mt-4 text-sm text-gray-600">
        {reservation.attentionSchedule.restaurant.address}
      </p>
      <div className="pt-5">
        <Button text="Cancelar reserva" color="error" />
      </div>
      <p className="mt-4 text-sm text-center text-gray-600">
        Muéstrale este código al personal del restaurante para que puedan
        validar tu reserva.
      </p>
    </div>
  );
}
