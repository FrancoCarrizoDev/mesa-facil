import { getReservations } from "@/app/actions/reservation";
import { DinnerReservationListContainer } from "@/app/components";
import { ReservationItemDTO } from "@/app/models/reservation-item.model";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return (
      <div>
        <p>Debe estar logueado para ver esta página</p>
        <a href="/api/auth/login">Ingresar</a>
      </div>
    );
  }

  const reservations: ReservationItemDTO[] = await getReservations();



  return (
    <div className="p-5">
      <DinnerReservationListContainer reservationList={reservations} />
    </div>
  );
}
