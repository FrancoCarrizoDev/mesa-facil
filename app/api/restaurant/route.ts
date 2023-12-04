import { Restaurant } from "@/app/models/restaurant.model";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";
import { uuid } from "uuidv4";

export const POST = async (req: Request) => {
  // @ts-ignore
  const { user } = (await getSession(req)) ?? {};

  if (!user) {
    return Response.json(
      {
        message: "Bad Request",
      },
      {
        status: 400,
      }
    );
  }

  const existsUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existsUser) {
    return Response.json(
      {
        message: "Bad Request",
      },
      {
        status: 400,
      }
    );
  }

  const body: Restaurant = await req.json();
  try {
    const newRestaurantId = uuid();
    await prisma.restaurant.create({
      data: {
        id: newRestaurantId,
        name: body.name,
        address: body.address,
        phone: body.phone,
        attentionSchedule: {},
        userId: user.id,
      },
    });

    for (const schedule of body.attentionSchedule) {
      await prisma.attentionSchedule.create({
        data: {
          id: uuid(),
          start: schedule.openingTime,
          end: schedule.closingTime,
          day: schedule.weekDay,
          restaurantId: newRestaurantId,
        },
      });
    }

    return Response.json({
      message: "Restaurant created",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
};

export const GET = async (req: Request) => {
  try {
    return Response.json({
      message: "Restaurant created",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
};
