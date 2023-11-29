import prisma from "@/lib/prisma";
import {
  handleAuth,
  Session,
  handleLogin,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { uuid } from "uuidv4";
import { NextApiRequest } from "next";

const afterCallback = async (req: NextApiRequest, session: Session) => {
  try {
    const { user } = session;
    const foundUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          id: uuid(),
          username: user.nickname,
        },
      });
    }

    return session;
  } catch (err) {
    const newSession: Session = {
      error: "Error logging in",
      user: [],
    };
    console.log({ err });
    return newSession;
  }
};

export const GET = handleAuth({
  login: handleLogin((req) => {
    return {
      authorizationParams: {
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    };
  }),
  //@ts-ignore
  callback: handleCallback({ afterCallback }),
});
