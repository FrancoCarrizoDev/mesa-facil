"use client";
import { useForm } from "@/app/hooks";
import { Restaurant } from "@/app/models/restaurant.model";
import { Reservation } from "@prisma/client";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "..";
registerLocale("es", es);

export default function Reservation({
  restaurant,
}: {
  readonly restaurant: Restaurant;
}) {
  const { user, isLoading } = useUser();
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
  const [dinnerDate, setDinnerDate] = useState<Date | null>(
    new Date("2023-12-14T22:00:00.000Z")
  );

  if (isLoading) return <div>Cargando...</div>;

  console.log({ values, restaurant });

  return (
    <div>
      <h1 className="pb-3 text-4xl font-bold text-blue-chill-950">
        Reservá en {restaurant.name}
      </h1>
      <p className="text-blue-chill-900 pb-3 text-center">
        {user
          ? `¡Hola ${user.name}! ¿Que día te esperamos?`
          : `Hola que día quieres reservar en ${restaurant.name}?`}
      </p>
      <form className="flex flex-col justify-between gap-3">
        <DatePicker
          selected={dinnerDate}
          onChange={(date) => setDinnerDate(date)}
          showTimeSelect
          locale="es"
          dateFormat="MMMM d, yyyy HH:mm"
          placeholderText="Selecciona una fecha"
          className="text-center border border-blue-chill-500 rounded-md p-1"
          excludeDateIntervals={[
            {
              start: new Date("2023-12-08T22:00:00.000Z"),
              end: new Date("2023-12-09T23:00:00.000Z"),
            },
          ]}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="people">Cantidad de personas</label>
          <div>
            <input
              className="border text-center border-blue-chill-500 rounded-md max-w-[60px] p-1"
              type="number"
              name="people"
              id="people"
              value={values.people}
              onChange={(e) => onChange({ people: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Algún comentario adicional?</label>

          <textarea
            className="border border-blue-chill-500 rounded-md py-2 px-3 text-sm resize-none"
            name="message"
            id="message"
            placeholder="Ej: Quiero una mesa afuera"
            value={values.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          text={user ? "Reservar" : "Reservar sin registrarme"}
        />
      </form>
    </div>
  );
}
