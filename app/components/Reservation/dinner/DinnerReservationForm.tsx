"use client";
import "react-datepicker/dist/react-datepicker.css";
import { createReservation } from "@/app/actions/reservation";
import { CreateReservationDTO, ReservationForm } from "@/app/models/reservation.model";
import { Dinner } from "@prisma/client";
import { Restaurant } from "@/app/models/restaurant.model";
import { TextField , Button  } from '@/app/components'
import { toast } from "react-toastify";
import { useDinnerReservation, useForm } from "@/app/hooks";
import { useRouter } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Link from "next/link";
registerLocale("es", es);

const getInitialValues = (dinner: Dinner | null) => ({
  id: "-1",
  attentionScheduleId: "",
  dinnerId: dinner?.id,
  date: new Date(),
  people: 0,
  message: "",
  name: dinner?.first_name,
  lastName: dinner?.last_name,
  email: dinner?.email,
  phone: dinner?.phone,
});

export default function DinnerReservationForm({
  restaurant: restaurantData,
  dinner : dinnerData,
}: {
  readonly restaurant: Restaurant;
  readonly dinner: Dinner | null;
}) {
  const router = useRouter();
  const { values, onChange } = useForm<ReservationForm>(
    getInitialValues(dinnerData)
  );

  const {  filterTimes, hashClosedDays,  restaurant,  minDate, maxDate} = useDinnerReservation({
    restaurant: restaurantData
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const createReservationDTO : CreateReservationDTO = {
        attentionScheduleId: values.attentionScheduleId,
        dinnerId: values.dinnerId,
        date: values.date,
        people: values.people,
        message: values.message,
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      }

      await createReservation(createReservationDTO);
      toast("Reserva creada con éxito, te esperamos!");
      if (dinnerData) {
        router.push("/reservations");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDate = (date: Date) => {
    onChange({
      date,
      attentionScheduleId: restaurant.attentionSchedule.find(
        (schedule) => schedule.dayNumber === date?.getDay()
      )?.id as string,
    });
  }


  return (
    <div className="px-10">
      <h1 className="pb-3 text-4xl font-bold">
        Reservá en <span className="text-orange-900">{restaurant.name}</span>
      </h1>
      <p className="text-black pb-3 text-center">
        {dinnerData
          ? `¡Hola ${dinnerData.first_name}! ¿Que día te esperamos?`
          : `!Hola! ¿Que día quieres reservar?`}
      </p>
      <form
        className="flex flex-col justify-between gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <DatePicker
            selected={values.date}
            onChange={onChangeDate}
            showTimeSelect
            locale="es"
            dateFormat="MMMM d, yyyy HH:mm"
            wrapperClassName="w-full"
            placeholderText="Fecha"
            className="w-full fullborder border bg-lemon-50 border-lemon-200 text-gray-500 rounded-md  capitalize placeholder:text-gray-500 placeholder:text-sm py-1 px-2"
            minDate={minDate}
            maxDate={maxDate}
            calendarStartDay={1}
            filterDate={(date) => !hashClosedDays[date.getDay()]}
            filterTime={filterTimes}
            timeIntervals={15}
          />
          <span className="ps-2">{values.date ? "✔️" : "👈"}</span>
        </div>
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
            disabled={!!dinnerData}
            emoji={values.dinnerId || values.name ? "✔️" : "👈"}
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
            disabled={!!dinnerData}
            emoji={values.dinnerId || values.lastName ? "✔️" : "👈"}
          />
        </div>
        <div>
          <TextField
            type="number"
            name="phone"
            label="Teléfono"
            placeholder="351-111-1212"
            value={values.phone ?? ""}
            onChange={(e) => onChange({ phone: e.target.value })}
            disabled={!!dinnerData}
            emoji={values.dinnerId || values.phone ? "✔️" : "👈"}
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
            disabled={!!dinnerData}
            emoji={values.dinnerId || values.email ? "✔️" : "👈"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="block my-2 text-sm font-medium text-gray-500"
          >
            Algún comentario adicional?
          </label>
          <div className="flex items-center">
            <textarea
              className="w-full border bg-lemon-50 border-lemon-200  text-gray-500 rounded-md py-2 px-3 text-xs resize-none"
              name="message"
              id="message"
              placeholder="Ej: En lo posible quiero una mesa al aire libre"
              value={values.message}
              onChange={(e) => onChange({ message: e.target.value })}
            />
            <span className="ps-2">{values.message ? "✔️" : "👈"}</span>
          </div>
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
          type="submit"
          text={values.dinnerId ? "Reservar 🤝" : "Reservar sin registrarme"}
        /> 
      </form>
    </div>
  );
}
