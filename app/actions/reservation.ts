"use server";

import prisma from "@/lib/prisma";
import { ReservationForm } from "../components/Reservation/Reservation";
import { uuid } from "uuidv4";
import { getSession } from "@auth0/nextjs-auth0";

export async function createReservation(form: ReservationForm) {
  try {
    if (!form.dinnerId) {
      // If the user is not logged in
      if (!form.email) {
        throw new Error("Email is required");
      }

      console.log("eject");
      const dinnerByEmail = await prisma.dinner.findUnique({
        where: {
          email: form.email,
        },
      });

      let newDinner;
      if (!dinnerByEmail) {
        newDinner = await prisma.dinner.create({
          data: {
            email: form.email,
            first_name: form.name!,
            last_name: form.lastName,
            id: uuid(),
          },
        });
      } else {
        newDinner = dinnerByEmail;
      }

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
    select: {
      id: true,
      people: true,
      date: true,
      attentionSchedule: {
        select: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
      status: {
        select: {
          status: true,
        },
      },
    },
  });

  return reservations;
};

export const getReservationById = async (id: string) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      people: true,
      date: true,
      attentionSchedule: {
        select: {
          restaurant: {
            select: {
              name: true,
              address: true,
            },
          },
        },
      },
    },
  });

  return reservation;
};
