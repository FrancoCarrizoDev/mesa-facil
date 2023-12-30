"use client";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField } from "..";
import { Restaurant } from "@/app/models/restaurant.model";
import { useForm } from "@/app/hooks";
import { WEEK_DAYS } from "@/app/constants";
import addDays from "date-fns/addDays";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import React, { useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Dinner } from "@prisma/client";
import Link from "next/link";
registerLocale("es", es);

interface ReservationFormProps {
  id: string;
  attentionScheduleId: string;
  dinnerId?: string;
  date: string | null;
  people: number;
  message?: string;
  name?: string;
  lastName?: string | null;
  email?: string | null;
}

const getInitialValues = (dinner: Dinner | null) => ({
  id: "-1",
  attentionScheduleId: "",
  dinnerId: dinner?.id,
  date: null,
  people: 0,
  message: "",
  name: dinner?.first_name,
  lastName: dinner?.last_name,
  email: dinner?.email,
});

export default function Reservation({
  restaurant,
  dinner,
}: {
  readonly restaurant: Restaurant;
  readonly dinner: Dinner | null;
}) {
  const { values, onChange } = useForm<ReservationFormProps>(
    getInitialValues(dinner)
  );
  const [dinnerDate, setDinnerDate] = useState<Date | null>(null);
  const closedDays = WEEK_DAYS.filter(
    (day) =>
      !restaurant.attentionSchedule.some(
        (schedule) => schedule.dayNumber === day.id
      )
  );
  const hashClosedDays = closedDays.reduce((acc, day) => {
    acc[day.id] = true;
    return acc;
  }, {} as Record<number, boolean>);

  const filterTimes = (time: Date) => {
    const day = time.getDay();
    const foundByDayId = restaurant.attentionSchedule.find(
      (schedule) => schedule.dayNumber === day
    );

    if (!foundByDayId) return false;

    const [startRangeHours, startRangeMinutes] = foundByDayId.start.split(":");
    const [endRangeHours, endRangeMinutes] = foundByDayId.end.split(":");

    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (
      setHours(setMinutes(new Date(), minutes), hours) >=
        setHours(
          setMinutes(new Date(), +startRangeMinutes),
          +startRangeHours
        ) &&
      setHours(setMinutes(new Date(), minutes), hours) <=
        setHours(setMinutes(new Date(), +endRangeMinutes), +endRangeHours)
    );
  };

  return (
    <div className="px-10">
      <h1 className="pb-3 text-4xl font-bold text-lemon-950">
        Reservá en {restaurant.name}
      </h1>
      <p className="text-black pb-3 text-center">
        {dinner
          ? `¡Hola ${dinner.first_name}! ¿Que día te esperamos?`
          : `!Hola! ¿Que día quieres reservar?`}
      </p>
      <form className="flex flex-col justify-between gap-3">
        <DatePicker
          selected={dinnerDate}
          onChange={(date) => setDinnerDate(date)}
          showTimeSelect
          locale="es"
          dateFormat="MMMM d, yyyy HH:mm"
          placeholderText="Selecciona una fecha"
          className="w-full text-center border bg-lemon-100 border-lemon-300 text-black rounded-md p-1 capitalize placeholder:text-lemon-900"
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          calendarStartDay={1}
          filterDate={(date) => !hashClosedDays[date.getDay()]}
          filterTime={filterTimes}
          timeIntervals={15}
          icon={<span>holi</span>}
        />
        <div>
          <TextField
            type="number"
            label="Cantidad de personas"
            placeholder="Cantidad de personas"
            name="people"
            value={String(values.people)}
            onChange={(e) => onChange({ people: +e.target.value })}
            emoji={values.people ? "✔️" : "👈"}
          />
        </div>
        <div>
          <TextField
            label="Nombre"
            type="text"
            name="first_name"
            placeholder="Adrian"
            value={values.name ?? ""}
            onChange={(e) => onChange({ name: e.target.value })}
            disabled={!!dinner}
            emoji={values.dinnerId ? "✔️" : undefined}
          />
        </div>
        <div>
          <TextField
            type="text"
            name="last_name"
            label="Apellido"
            placeholder="Perez"
            value={values.lastName ?? ""}
            onChange={(e) => onChange({ lastName: e.target.value })}
            disabled={!!dinner}
            emoji={values.dinnerId ? "✔️" : undefined}
          />
        </div>
        <div>
          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="maria.perez@gmail.com"
            value={values.email ?? ""}
            onChange={(e) => onChange({ email: e.target.value })}
            disabled={!!dinner}
            emoji={values.dinnerId ? "✔️" : undefined}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="block my-2 text-sm font-medium text-gray-900"
          >
            Algún comentario adicional?
          </label>
          <textarea
            className="border bg-lemon-50 border-lemon-200  text-gray-900 rounded-md py-2 px-3 text-sm resize-none"
            name="message"
            id="message"
            placeholder="Ej: En lo posible quiero una mesa al aire libre"
            value={values.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
        </div>
        <p className="text-xs">
          Al reservar estás aceptando nuestros{" "}
          <Link className="text-[blue] underline" href={"/"}>
            términos y condiciones
          </Link>
          .
        </p>
        <Button
          variant="contained"
          color="primary"
          text={dinner ? "Reservar 🤝" : "Reservar sin registrarme"}
        />
      </form>
    </div>
  );
}
