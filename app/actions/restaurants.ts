"use server";
import prisma from "@/lib/prisma";

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

    return Response.json(restaurant);
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
}
