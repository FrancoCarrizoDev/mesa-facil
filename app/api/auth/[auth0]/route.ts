import {
  handleAuth,
  Session,
  handleLogin,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";

const afterCallback = async (req: NextApiRequest, session: Session) => {
  try {
    // find user by email in primsa db
    // if user not found, create new user
    console.log({ session });

    // const foundUser = await prisma.user.findUnique({

    // })
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
