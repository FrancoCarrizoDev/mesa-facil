"use server";

import prisma from "@/lib/prisma";
import { v4 as uuid } from "uuid";
import { getSession } from "@auth0/nextjs-auth0";
import { CreateReservationDTO, ReservationStatus } from "@models";

export async function createReservation(data: CreateReservationDTO) {
  try {
    if (!data.dinnerId) {
      // If the user is not logged in
      if (!data.email) {
        throw new Error("Email is required");
      }

      const dinnerByEmail = await prisma.dinner.findUnique({
        where: {
          email: data.email,
        },
      });

      let newDinner;
      if (!dinnerByEmail) {
        newDinner = await prisma.dinner.create({
          data: {
            email: data.email,
            first_name: data.name!,
            last_name: data.lastName,
            id: uuid(),
          },
        });
      } else {
        newDinner = dinnerByEmail;
      }

      data.dinnerId = newDinner.id;
    }

    const reservation = await prisma.reservation.create({
      data: {
        dinnerId: data.dinnerId,
        attentionScheduleId: data.attentionScheduleId,
        code: uuid(),
        date: data.date.toISOString(),
        message: data.message,
        people: data.people,
        statusId: ReservationStatus.CREATED,
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
          id: true,
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

export const cancelReservation = async (id: string) => {
  try {
    const reservation = await prisma.reservation.update({
      where: {
        id,
      },
      data: {
        statusId: ReservationStatus.CANCELED,
      },
    });

    return reservation;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
