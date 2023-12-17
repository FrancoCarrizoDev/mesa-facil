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
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import { WEEK_DAYS } from "@/app/constants";
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
  const [dinnerDate, setDinnerDate] = useState<Date | null>(new Date());
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
  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="px-10">
      <h1 className="pb-3 text-4xl font-bold text-blue-chill-950">
        Reservá en {restaurant.name}
      </h1>
      <p className="text-blue-chill-900 pb-3 text-center">
        {user
          ? `¡Hola ${user.name}! ¿Que día te esperamos?`
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
          className="text-center border border-blue-chill-500 rounded-md p-1 capitalize"
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          calendarStartDay={1}
          filterDate={(date) => !hashClosedDays[date.getDay()]}
          filterTime={filterTimes}
          timeIntervals={15}
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
          <label htmlFor="first_name">Dejanos tu nombre</label>
          <div>
            <input
              className="border text-center border-blue-chill-500 rounded-md p-1"
              type="text"
              name="first_name"
              id="first_name"
              value={values.people}
              onChange={(e) => onChange({ people: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last_name">Dejanos tu apellido</label>
          <div>
            <input
              className="border text-center border-blue-chill-500 rounded-md p-1"
              type="text"
              name="last_name"
              id="last_name"
              value={values.people}
              onChange={(e) => onChange({ people: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <div>
            <input
              className="border text-center border-blue-chill-500 rounded-md p-1"
              type="email"
              name="email"
              id="email"
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
