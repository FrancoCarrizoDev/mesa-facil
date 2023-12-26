"use client";
import { TextField } from "@/app/components";
import { useForm } from "@/app/hooks";
import { Claims } from "@auth0/nextjs-auth0";
import DatePicker from "react-datepicker";
export default function CompleteProfile({
  user,
  redirectTo,
}: {
  readonly user: Claims;
  readonly redirectTo: string;
}) {
  const { values, onChange } = useForm<{
    first_name: string;
    last_name: string;
    phone: string;
    birthday: string;
    id: string;
    email: string;
  }>({
    first_name: user?.name ?? "",
    last_name: (user?.family_name as string) ?? "",
    phone: (user?.phone as string) ?? "",
    birthday: (user?.birthday as string) ?? "",
    id: user?.sub ?? "",
    email: user?.email ?? "",
  });

  console.log({ values });

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Completemos tu perfil 😄</h1>
      <p className="pt-3 text-sm text-gray-500">
        Por favor completa tu perfil para poder{" "}
        <span className="font-bold">reservar</span>
      </p>
      <form className="mt-5 grid">
        <TextField
          label="Email"
          placeholder="Email"
          onChange={() => {
            onChange({ email: user?.email ?? "" });
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
            onChange({ first_name: user?.name ?? "" });
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
        {/* <TextField
          label="Día de cumpleaños"
          placeholder="10/10/1990"
          onChange={(e) => {
            onChange({ birthday: new Date(e.target.value).toISOString() });
          }}
          value={values.birthday}
          name="date"
          type="date"
          emoji="👈"
        /> */}
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
        </div>
      </form>
    </div>
  );
}
