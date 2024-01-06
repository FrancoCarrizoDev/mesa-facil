"use client";

import QRCode from "react-qr-code";
import { Button } from "../..";
import { ReservationByIdDTO } from "@/app/models/reservation.model";
import { cancelReservation } from "@/app/actions/reservation";
import { toast } from "react-toastify";

export default function DinnerReservationDetail({
  reservation,
}: {
  readonly reservation: ReservationByIdDTO;
}) {
  const onCancelReservation = async () => {
    const actionResponse = await cancelReservation(reservation.id);
    if (actionResponse) {
      toast("Reserva cancelada");
    } else {
      toast("No se pudo cancelar la reserva", {
        type: "error",
      });
    }
  };

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
        <Button
          text="Cancelar reserva"
          color="error"
          onClick={onCancelReservation}
        />
      </div>
      <p className="mt-4 text-sm text-center text-gray-600">
        Muéstrale este código al personal del restaurante para que puedan
        validar tu reserva.
      </p>
    </div>
  );
}
