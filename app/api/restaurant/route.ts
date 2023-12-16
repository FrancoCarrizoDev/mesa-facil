import { Restaurant } from "@/app/models/restaurant.model";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";
import { uuid } from "uuidv4";
import slugify from "slugify";

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
        slug: slugify(body.name, { lower: true, remove: /[*+~.()'"!:@]/g }),
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
          start: schedule.start,
          end: schedule.end,
          day: schedule.day,
          dayNumber: schedule.dayNumber,
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

    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: user.id,
      },
      include: {
        attentionSchedule: true,
      },
    });

    return Response.json(restaurants);
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
};
