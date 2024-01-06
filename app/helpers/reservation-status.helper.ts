import { ReservationStatus } from "../models/reservation.model";

export const getReservationLabel = (statusLabel: number): string => {
  switch (statusLabel) {
    case ReservationStatus.CREATED:
      return "Creada";
    case ReservationStatus.ACEPTED:
      return "Confirmada";
    case ReservationStatus.REJECTED:
      return "Rechazada";
    case ReservationStatus.REPROGRAMED:
      return "Reprogramada";
    case ReservationStatus.CANCELED:
      return "Cancelada";
    default:
      return "Creada";
  }
};
