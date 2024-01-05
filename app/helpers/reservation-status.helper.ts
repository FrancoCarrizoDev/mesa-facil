import { ReservationStatus } from "../models/reservation-item.model";

export const getReservationLabel = (statusLabel: string): string => {
  switch (statusLabel) {
    case ReservationStatus.CREATED.toString():
      return "Creada";
    case ReservationStatus.CONFIRMED.toString():
      return "Confirmada";
    case ReservationStatus.REJECTED.toString():
      return "Rechazada";
    case ReservationStatus.REPROGRAMMED.toString():
      return "Reprogramada";
    default:
      return "Creada";
  }
};
