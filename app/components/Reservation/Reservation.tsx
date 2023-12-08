"use client";
import { useForm } from "@/app/hooks";
import { Restaurant } from "@/app/models/restaurant.model";
import { Reservation } from "@prisma/client";
import React from "react";

export default function Reservation({
  restaurant,
}: {
  readonly restaurant: Restaurant;
}) {
  const { values, onChange } = useForm<Reservation>({
    id: "-1",
    attentionScheduleId: "",
    dinnerId: null,
    date: new Date().toISOString(),
    people: "",
    message: "",
    code: "",
    statusId: 1,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-chill-950">
        Reservá en {restaurant.name}
      </h1>
      <p className="text-blue-chill-900">
        Selecciona la fecha y hora para tu reserva
      </p>
    </div>
  );
}
