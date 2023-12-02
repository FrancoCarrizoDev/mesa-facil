"use client";
import React, { ChangeEvent, useState } from "react";
import { BackButton, Button, CreateAtentionSchedules, TextField } from "..";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/hooks";
import { Restaurant } from "@/app/models/restaurant.model";
import { AttentionSchedule } from "@/app/models/attention-schedule.model";

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

  console.log({ attentionScheduleToEdit });

  return (
    <form
      className="mt-5 flex flex-col justify-between"
      style={{ minHeight: "400px" }}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <TextField
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
            value={values.phone}
            label={"Teléfono"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange({
                phone: e.target.value,
              })
            }
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <CreateAtentionSchedules
            onChange={(attentionSchedule) =>
              onChange({
                attentionSchedule: Array.isArray(attentionSchedule)
                  ? [...values.attentionSchedule, ...attentionSchedule]
                  : [...values.attentionSchedule, attentionSchedule],
              })
            }
            initialAttentionSchedule={attentionScheduleToEdit}
          />
          <div className="mt-5">
            {values.attentionSchedule.length > 0 ? (
              values.attentionSchedule.map(
                ({ weekDay, closingTime, openingTime }) => (
                  <div
                    key={weekDay + openingTime}
                    className="flex justify-between "
                  >
                    <p className="font-medium">{`*${weekDay} ${openingTime}hs - ${closingTime}hs`}</p>
                    <div className="flex gap-3">
                      <Button
                        text="Editar"
                        type="button"
                        onClick={() => {
                          setAttentionScheduleToEdit({
                            weekDay,
                            openingTime,
                            closingTime,
                          });
                          onChange({
                            attentionSchedule: values.attentionSchedule.filter(
                              (schedule) => {
                                if (schedule.weekDay !== weekDay) {
                                  return true;
                                }

                                return (
                                  schedule.openingTime !== openingTime &&
                                  schedule.closingTime !== closingTime
                                );
                              }
                            ),
                          });
                        }}
                      />

                      <Button
                        text="Eliminar"
                        type="button"
                        onClick={() => {
                          onChange({
                            attentionSchedule: values.attentionSchedule.filter(
                              (schedule) => {
                                if (schedule.weekDay !== weekDay) {
                                  return true;
                                }

                                return (
                                  schedule.openingTime !== openingTime &&
                                  schedule.closingTime !== closingTime
                                );
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
      </div>

      <div className="flex justify-end gap-3">
        <BackButton
          onClick={() => {
            router.back();
          }}
        />
        <Button type="submit" onClick={() => {}} text="CREAR" />
      </div>
    </form>
  );
}
