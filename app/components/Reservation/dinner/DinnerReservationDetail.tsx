"use client";

import QRCode from "react-qr-code";
import { Button } from "../..";
import { ReservationByIdDTO } from "@models";
import { cancelReservation } from "@actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DinnerReservationDetail({
  reservation,
}: {
  readonly reservation: ReservationByIdDTO;
}) {
  const router = useRouter();
  const onCancelReservation = async () => {
    const actionResponse = await cancelReservation(reservation.id);
    if (actionResponse) {
      toast("Reserva cancelada");
      router.push("/reservations");
    } else {
      toast("No se pudo cancelar la reserva", {
        type: "error",
      });
    }
  };

  const reservationUrlCode = `${process.env.NEXT_PUBLIC_BASE_URL}/private/reserve/${reservation.id}`;

  console.log({reservationUrlCode})

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <QRCode value={reservationUrlCode} size={256} />
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
