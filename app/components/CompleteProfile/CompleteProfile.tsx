"use client";
import { updateDinnerById } from "@/app/actions/dinner";
import { Button, TextField } from "@/app/components";
import { useForm } from "@/app/hooks";
import { Dinner } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
export default function CompleteProfile({
  dinner,
}: {
  readonly dinner: Dinner;
}) {
  const { values, onChange } = useForm<{
    first_name: string;
    last_name: string;
    phone: string;
    birthday: string;
    id: string;
    email: string;
  }>({
    id: dinner.id,
    first_name: dinner.first_name,
    last_name: dinner?.last_name ?? "",
    phone: dinner?.phone ?? "",
    birthday: dinner?.birthday ?? "",
    email: dinner?.email ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const updatedUser = await updateDinnerById(dinner.id, {
        birthday: values.birthday,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
      });

      if (updatedUser) {
        toast.success("Perfil actualizado correctamente");
        router.replace(`/reserve/${searchParams.get("redirectTo")}`);
      }
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Completemos tu perfil 😄</h1>
      <p className="pt-3 text-sm text-gray-500">
        Por favor completa tu perfil para poder{" "}
        <span className="font-bold">reservar</span>
      </p>
      <form className="mt-5 grid" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          placeholder="Email"
          onChange={() => {
            onChange({ email: dinner?.email ?? "" });
          }}
          value={values.email}
          name="email"
          disabled={values.email !== ""}
          emoji="✔️"
        />
        <TextField
          label="Nombre"
          placeholder="Nombre"
          onChange={() => {
            onChange({ first_name: dinner?.last_name ?? "" });
          }}
          value={values.first_name}
          name="name"
          disabled
          emoji="✔️"
        />
        <TextField
          label="Apellido"
          placeholder="Apellido"
          onChange={(e) => {
            onChange({ last_name: e.target.value });
          }}
          value={values.last_name}
          name="family_name"
          emoji="👈"
        />
        <TextField
          label="Teléfono"
          placeholder="351 5555555"
          onChange={(e) => {
            onChange({ phone: e.target.value });
          }}
          value={values.phone}
          name="phone"
          emoji="👈"
        />
        <div className="flex flex-col">
          <label
            htmlFor="birthday"
            className="my-2 text-sm font-medium text-gray-900"
          >
            Fecha de cumpleaños
          </label>
          <div className="flex gap-2">
            <DatePicker
              id="birthday"
              selected={values.birthday ? new Date(values.birthday) : undefined}
              onChange={(date) => onChange({ birthday: date?.toISOString() })}
              locale="es"
              dateFormat="d MMMM, yyyy"
              placeholderText="Selecciona una fecha"
              className="bg-lemon-50 border border-lemon-200  text-gray-900 text-sm rounded-md block w-full p-2  capitalize"
              calendarStartDay={1}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            <span>👈</span>
          </div>
          <div className="mt-5 w-full">
            <Button
              type="submit"
              text="Guardar"
              color="primary"
              fullWidth={"true"}
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
