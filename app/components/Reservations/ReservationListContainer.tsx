import { DinnerReservation } from "@/app/models/reservation.model";
import { ReservationItem } from ".";

export default function ReservationListContainer({
  reservationList,
}: {
  readonly reservationList: DinnerReservation[];
}) {
  return (
    <div>
      <div className="flex flex-col">
        <h4 className="text-2xl font-semibold">Mis Reservas</h4>
        <hr />
      </div>
      <ul className="pt-3 overflow-x-auto divide-y divide-gray-200">
        {reservationList.map((reservation) => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))}
      </ul>
    </div>
  );
}
