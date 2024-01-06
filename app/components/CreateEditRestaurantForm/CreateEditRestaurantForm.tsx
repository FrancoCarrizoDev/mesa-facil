"use client";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Button, CreateAtentionSchedules, TextField } from "..";
import { useRouter } from "next/navigation";
import { useForm } from "@hooks";
import { Restaurant, AttentionSchedule } from "@models";
import { WEEK_DAYS } from "@constants";
import { checkIfClosingTimeIsBeforeOpeningTime } from "./utils";
import { createRestaurant } from "@actions";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";

const INITIAL_VALUES: Restaurant = {
  id: "1",
  name: "",
  address: "",
  phone: "",
  attentionSchedule: [],
  slug: "",
};

export default function CreateEditRestaurantForm({
  restaurant,
}: {
  readonly restaurant?: Restaurant;
}) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { values, onChange } = useForm<Restaurant>(
    restaurant ?? INITIAL_VALUES
  );
  const [attentionScheduleToEdit, setAttentionScheduleToEdit] = useState<
    AttentionSchedule | undefined
  >();

  const filterAttentionSchedule = (
    attentionSchedule: AttentionSchedule[],
    { day, start, end }: AttentionSchedule
  ) => {
    return attentionSchedule.filter((schedule) => {
      if (schedule.day !== day) {
        return true;
      }

      return schedule.start !== start && schedule.end !== end;
    });
  };

  const checkIfAttentionScheduleIsColliding = (
    attentionSchedule: AttentionSchedule
  ) => {
    const weekDay = attentionSchedule.day;
    const filteredAttentionScheduleByWeekDay = values.attentionSchedule.filter(
      (schedule) => schedule.day === weekDay
    );
    return filteredAttentionScheduleByWeekDay.some((schedule) => {
      const openingTime = parseInt(schedule.start.split(":")[0]);
      const closingTime = parseInt(schedule.end.split(":")[0]);
      const newOpeningTime = parseInt(attentionSchedule.start.split(":")[0]);
      const newClosingTime = parseInt(attentionSchedule.end.split(":")[0]);
      if (newOpeningTime >= openingTime && newOpeningTime <= closingTime) {
        return true;
      }
      if (newClosingTime >= openingTime && newClosingTime <= closingTime) {
        return true;
      }
      return false;
    });
  };

  const sortAttentionScheduleByWeekDayAndOpeningTime = useMemo(() => {
    return values.attentionSchedule.sort((a, b) => {
      const weekDayA = WEEK_DAYS.find((day) => day.weekDay === a.day)!.id;
      const weekDayB = WEEK_DAYS.find((day) => day.weekDay === b.day)!.id;
      if (weekDayA > weekDayB) {
        return 1;
      }
      if (weekDayA < weekDayB) {
        return -1;
      }
      const openingTimeA = parseInt(a.start.split(":")[0]);
      const openingTimeB = parseInt(b.start.split(":")[0]);
      if (openingTimeA > openingTimeB) {
        return 1;
      }
      if (openingTimeA < openingTimeB) {
        return -1;
      }
      return 0;
    });
  }, [values.attentionSchedule]);

  const onAddAttentionSchedule = (
    attentionSchedule: AttentionSchedule | AttentionSchedule[]
  ) => {
    if (Array.isArray(attentionSchedule)) {
      const isOpeningTimeBeforeClosingTime = attentionSchedule.some(
        (schedule) => {
          return checkIfClosingTimeIsBeforeOpeningTime(schedule);
        }
      );

      if (isOpeningTimeBeforeClosingTime) {
        alert("El horario de cierre debe ser mayor al de apertura.");
        return;
      }
      const isCollided = attentionSchedule.some((schedule) => {
        return checkIfAttentionScheduleIsColliding(schedule);
      });
      if (isCollided) {
        alert("El horario ingresado se superpone con otro.");
        return;
      }
      onChange({
        attentionSchedule: [...values.attentionSchedule, ...attentionSchedule],
      });
      return;
    }

    const isOpeningTimeBeforeClosingTime =
      checkIfClosingTimeIsBeforeOpeningTime(attentionSchedule);

    if (isOpeningTimeBeforeClosingTime) {
      alert("El horario de cierre debe ser mayor al de apertura.");
      return;
    }

    const isCollided = checkIfAttentionScheduleIsColliding(attentionSchedule);

    if (isCollided) {
      alert("El horario ingresado se superpone con otro.");
      return;
    }

    onChange({
      attentionSchedule: [...values.attentionSchedule, attentionSchedule],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createRestaurant(values);
      toast("Restaurante creado con éxito", { type: "success" });
      router.push("/private/restaurants");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="mt-5 flex flex-col justify-between"
      style={{ minHeight: "400px" }}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="flex flex-col ">
          <CreateAtentionSchedules
            onChange={onAddAttentionSchedule}
            initialAttentionSchedule={attentionScheduleToEdit}
          />
        </div>
        <div>
          <TextField
            name="name"
            label={"Nombre"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({
                name: e.target.value,
              })
            }
            value={values.name}
            placeholder="Delicattesen"
            required
          />
          <TextField
            name="address"
            value={values.address}
            label={"Dirección"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({
                address: e.target.value,
              })
            }
            placeholder="Av. Siempre Viva 123"
            required
          />
          <TextField
            name="phone"
            value={values.phone}
            label={"Teléfono de reservas"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({
                phone: e.target.value,
              })
            }
            placeholder="123-45-678"
            required
          />
        </div>
      </div>
      <div className="pe-6">
        <div className="w-1/2 border border-lemon-500 rounded-md p-3">
          <div className="max-w-fit">
            <h3 className="font-bold ">Horarios de reserva cargados</h3>
            <hr className="w-full border-lemon-300 pt-1 pb-3" />
          </div>
          {values.attentionSchedule.length > 0 ? (
            sortAttentionScheduleByWeekDayAndOpeningTime.map(
              ({ day, end, start }) => (
                <div
                  key={day + start}
                  className="flex justify-between items-center pt-1"
                >
                  <div className="w-full flex items-center justify-between pe-3">
                    <p className="text-xs font-medium">{day}</p>
                    <p className="text-xs font-medium">{`${start}hs - ${end}hs`}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      text="Editar"
                      type="button"
                      color="warning"
                      size="xs"
                      onClick={() => {
                        setAttentionScheduleToEdit({
                          day,
                          start,
                          end,
                          dayNumber: WEEK_DAYS.find(
                            (weekDay) => weekDay.weekDay === day
                          )!.id,
                        });
                        onChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule,
                            {
                              day,
                              start,
                              end,
                              dayNumber: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === day
                              )!.id,
                            }
                          ),
                        });
                      }}
                    />
                    <Button
                      text="Eliminar"
                      type="button"
                      color="error"
                      size="xs"
                      onClick={() => {
                        onChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule,
                            {
                              day,
                              start,
                              end,
                              dayNumber: WEEK_DAYS.find(
                                (weekDay) => weekDay.weekDay === day
                              )!.id,
                            }
                          ),
                        });
                      }}
                    />
                  </div>
                </div>
              )
            )
          ) : (
            <p>No tienes horarios cargados todavía.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => {
            router.back();
          }}
          text="VOLVER"
          type="button"
          variant="outlined"
          color="secondary"
        />
        <Button type="submit" text="CREAR" />
      </div>
    </form>
  );
}
