"use server";

import prisma from "@/lib/prisma";

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
