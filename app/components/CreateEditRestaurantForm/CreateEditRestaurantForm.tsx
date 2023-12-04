"use client";
import React, { ChangeEvent, useMemo, useState } from "react";
import { Button, CreateAtentionSchedules, TextField } from "..";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/hooks";
import { Restaurant } from "@/app/models/restaurant.model";
import { AttentionSchedule } from "@/app/models/attention-schedule.model";
import { WEEK_DAYS } from "@/app/constants";
import { checkIfClosingTimeIsBeforeOpeningTime } from "./utils";
import { createRestaurant } from "@/app/services/restaurant.service";
import { toast } from "react-toastify";
const INITIAL_VALUES: Restaurant = {
  id: "1",
  name: "",
  address: "",
  phone: "",
  attentionSchedule: [],
};

export default function CreateEditRestaurantForm() {
  const router = useRouter();
  const { values, onChange } = useForm<Restaurant>(INITIAL_VALUES);
  const [attentionScheduleToEdit, setAttentionScheduleToEdit] = useState<
    AttentionSchedule | undefined
  >();

  const filterAttentionSchedule = (attentionSchedule: AttentionSchedule[]) => {
    return attentionSchedule.filter((schedule) => {
      if (schedule.weekDay !== attentionScheduleToEdit?.weekDay) {
        return true;
      }

      return (
        schedule.openingTime !== attentionScheduleToEdit?.openingTime &&
        schedule.closingTime !== attentionScheduleToEdit?.closingTime
      );
    });
  };

  const checkIfAttentionScheduleIsColliding = (
    attentionSchedule: AttentionSchedule
  ) => {
    const weekDay = attentionSchedule.weekDay;
    const filteredAttentionScheduleByWeekDay = values.attentionSchedule.filter(
      (schedule) => schedule.weekDay === weekDay
    );
    return filteredAttentionScheduleByWeekDay.some((schedule) => {
      const openingTime = parseInt(schedule.openingTime.split(":")[0]);
      const closingTime = parseInt(schedule.closingTime.split(":")[0]);
      const newOpeningTime = parseInt(
        attentionSchedule.openingTime.split(":")[0]
      );
      const newClosingTime = parseInt(
        attentionSchedule.closingTime.split(":")[0]
      );
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
      const weekDayA = WEEK_DAYS.find((day) => day.weekDay === a.weekDay)!.id;
      const weekDayB = WEEK_DAYS.find((day) => day.weekDay === b.weekDay)!.id;
      if (weekDayA > weekDayB) {
        return 1;
      }
      if (weekDayA < weekDayB) {
        return -1;
      }
      const openingTimeA = parseInt(a.openingTime.split(":")[0]);
      const openingTimeB = parseInt(b.openingTime.split(":")[0]);
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
      const response = await createRestaurant(values);

      debugger;

      if (response.status !== 201) {
        toast("Error al crear el restaurante", { type: "error" });
        return;
      }

      router.push("/private/restaurants");
      toast("Restaurante creado con éxito", { type: "success" });
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
        <div className="w-1/2 border border-blue-chill-500 rounded-md p-3">
          <div className="max-w-fit">
            <h3 className="font-bold ">Horarios de reserva cargados</h3>
            <hr className="w-full border-blue-chill-300 pt-1 pb-3" />
          </div>
          {values.attentionSchedule.length > 0 ? (
            sortAttentionScheduleByWeekDayAndOpeningTime.map(
              ({ weekDay, closingTime, openingTime }) => (
                <div
                  key={weekDay + openingTime}
                  className="flex justify-between items-center pt-1"
                >
                  <div className="w-full flex items-center justify-between pe-3">
                    <p className="text-xs font-medium">{weekDay}</p>
                    <p className="text-xs font-medium">{`${openingTime}hs - ${closingTime}hs`}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      text="Editar"
                      type="button"
                      color="warning"
                      size="xs"
                      onClick={() => {
                        setAttentionScheduleToEdit({
                          weekDay,
                          openingTime,
                          closingTime,
                        });
                        onChange({
                          attentionSchedule: filterAttentionSchedule(
                            values.attentionSchedule
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
                            values.attentionSchedule
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
