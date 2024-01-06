"use server";
import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { AttentionSchedule, Restaurant } from "@prisma/client";
import { Restaurant as IRestaurant } from "@models";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

export const getRestaurantsByUserId = async (
  userId: string
): Promise<
  ({
    attentionSchedule: {
      id: string;
      restaurantId: string;
      day: string;
      dayNumber: number;
      start: string;
      end: string;
    }[];
  } & {
    id: string;
    name: string;
    phone: string;
    address: string;
    userId: string;
    slug: string | null;
  })[]
> => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: userId,
      },
      include: {
        attentionSchedule: true,
      },
    });

    return restaurants;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export async function getRestaurantById({ id }: { id: string }) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        attentionSchedule: true,
      },
    });

    return Response.json(restaurant);
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
}

export interface RestaurantDTO extends Restaurant, AttentionSchedule {}

export async function getRestaurantBySlug({ slug }: { slug: string }) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      include: {
        attentionSchedule: true,
      },
    });

    return restaurant;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getRestaurantsByUser() {
  try {
    // @ts-ignore
    const { user } = (await getSession()) ?? {};

    if (!user) {
      return [];
    }

    const existsUser = await prisma.user.findUnique({
      where: {
        id: user.sub,
      },
    });

    if (!existsUser) {
      return [];
    }

    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: user.id,
      },
      include: {
        attentionSchedule: true,
      },
    });

    return restaurants;
  } catch (error) {
    console.log(error);
  }
}

export async function createRestaurant(restaurant: IRestaurant) {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    throw new Error("User not loggqged in");
  }

  const existsUser = await prisma.user.findUnique({
    where: {
      sub: user.sub,
    },
  });

  if (!existsUser) {
    throw new Error("User not found in DB");
  }

  try {
    const newRestaurantId = uuid();
    await prisma.restaurant.create({
      data: {
        id: newRestaurantId,
        name: restaurant.name,
        slug: slugify(restaurant.name, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
        }),
        address: restaurant.address,
        phone: restaurant.phone,
        attentionSchedule: {},
        userId: existsUser.id,
      },
    });

    for (const schedule of restaurant.attentionSchedule) {
      await prisma.attentionSchedule.create({
        data: {
          id: uuid(),
          start: schedule.start,
          end: schedule.end,
          day: schedule.day,
          dayNumber: schedule.dayNumber,
          restaurantId: newRestaurantId,
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
