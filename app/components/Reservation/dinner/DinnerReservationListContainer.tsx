import { ReservationItemDTO, ReservationStatus } from "@models";
import Link from "next/link";
import { getReservationLabelStatus } from "@helpers";
import { EmptyDinnerReserve } from "../../EmptyDInnerReserve";

export default function ReservationListContainer({
  reservationList,
}: {
  readonly reservationList: ReservationItemDTO[];
}) {
  return (
    <div>
      <div className="flex flex-col">
        <h4 className="text-2xl font-semibold">Mis Reservas</h4>
      </div>
      <div className="pt-3 flex flex-col gap-3 items-center justify-between">
        {reservationList.length > 0 ? (
          reservationList.map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-col gap-1 w-full px-4 py-3 rounded-md bg-white shadow-md hover:bg-gray-50 cursor-pointer min-h-[120px]"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">
                  {reservation.attentionSchedule.restaurant.name} -{" "}
                  <span className="text-sm text-gray-500">
                    {reservation.attentionSchedule.restaurant.address}
                  </span>
                </p>
                {reservation.status.id === ReservationStatus.ACEPTED && (
                  <Link href={`/reservations/${reservation.id}`}>Ver QR</Link>
                )}
              </div>

              <div className="text-sm text-gray-500">
                <p className="">
                  Hemos recibido tu reserva para {reservation.people} personas.
                </p>
                <p>Te avisaremos cuando esté confirmada 💪</p>
              </div>
              <div className="flex items-center justify-between text-sm font-medium">
                <p>
                  {new Date(reservation.date).toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  {new Date(reservation.date).toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  hs 📅
                </p>
              </div>
              <div className="flex items-center justify-between"></div>
            </div>
          ))
        ) : (
          <EmptyDinnerReserve />
        )}
      </div>
    </div>
  );
}
