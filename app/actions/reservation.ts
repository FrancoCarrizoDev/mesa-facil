"use server";

import prisma from "@/lib/prisma";
import { ReservationForm } from "../components/Reservation/Reservation";
import { uuid } from "uuidv4";
import { getSession } from "@auth0/nextjs-auth0";

export async function createReservation(form: ReservationForm) {
  try {
    if (!form.dinnerId) {
      const newDinner = await prisma.dinner.create({
        data: {
          email: form.email,
          first_name: form.name!,
          last_name: form.lastName,
          id: uuid(),
        },
      });

      form.dinnerId = newDinner.id;
    }

    const reservation = await prisma.reservation.create({
      data: {
        dinnerId: form.dinnerId,
        attentionScheduleId: form.attentionScheduleId,
        code: uuid(),
        date: form.date!,
        message: form.message!,
        people: String(form.people!),
        statusId: 1,
      },
    });

    return reservation;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export const getReservations = async () => {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return [];
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      dinner: {
        email: user.email,
      },
    },
    include: {
      dinner: true,
      attentionSchedule: {
        include: {
          restaurant: true,
        },
      },
      status: true,
    },
  });

  return reservations;
};
