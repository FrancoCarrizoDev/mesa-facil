import { ReservationStatus } from "../models/reservation.model";

export const getReservationLabelStatus = (statusLabel: number): string => {
  switch (statusLabel) {
    case ReservationStatus.CREATED:
      return "creada";
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
