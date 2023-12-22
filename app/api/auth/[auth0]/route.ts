import {
  handleAuth,
  Session,
  handleLogin,
  handleCallback,
  handleLogout,
} from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";

const afterCallback = async (req: NextApiRequest, session: Session) => {
  try {
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
    const querys = new URLSearchParams(req.url?.split("?")[1]);
    const redirectTo = querys.get("redirectTo");

    return {
      authorizationParams: {
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
      returnTo: redirectTo ?? "/private",
    };
  }),
  //@ts-ignore
  callback: handleCallback({ afterCallback }),
  logout: handleLogout((req) => {
    const querys = new URLSearchParams(req.url?.split("?")[1]);
    const redirectTo = querys.get("redirectTo");
    return {
      returnTo: redirectTo ?? "/",
    };
  }),
});
