import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

interface ErrorToken {
  code: "ERR_JWT_EXPIRED" | "VALID_TOKEN" | "INVALID_TOKEN";
  message: string;
}

export async function middleware(request: NextRequest) {
  // const res = NextResponse.next();
  // const currentUrl = request.url;
  // const { pathname } = request.nextUrl;
  // const goToLogin = pathname.includes("login");
  // const goToAuth = pathname.includes("api/auth");
  // const { user, idToken, accessToken } = (await getSession(request, res)) ?? {};
  // if (pathname.includes("api")) {
  //   if (goToAuth || goToLogin) return;
  //   if (idToken === undefined && accessToken === undefined) {
  //     return NextResponse.json(
  //       {
  //         error: "Unauthorized",
  //       },
  //       {
  //         status: 401,
  //       }
  //     );
  //   }
  //   const validateToken = await authenticateRequest(idToken!, request);
  //   if (validateToken.code === "ERR_JWT_EXPIRED") {
  //     res.cookies.set("tokenExpired", "true");
  //     return NextResponse.json(
  //       { success: false, message: "authentication failed" },
  //       { status: 401 }
  //     );
  //   }
  //   const response = NextResponse.next();
  //   response.headers.set("Authorization", `Bearer ${accessToken}`);
  //   response.headers.set("X-Auth0-Access-Token", accessToken?.toString() ?? "");
  //   response.headers.set("Content-Type", "application/json");
  //   return response;
  // }
  // if (pathname.includes("logout")) {
  //   res.cookies.delete("loginRequired");
  //   res.cookies.delete("tokenExpired");
  //   return res;
  // }
  // if (currentUrl.endsWith("/") && user && idToken) {
  //   const validateToken = await authenticateRequest(idToken, request);
  //   if (validateToken.code === "VALID_TOKEN") {
  //     const nextUrl = new URL("/private", request.nextUrl.origin);
  //     return NextResponse.redirect(nextUrl);
  //   } else {
  //     const nextUrl = new URL("/", request.nextUrl.origin);
  //     const response = NextResponse.redirect(nextUrl);
  //     response.cookies.delete("appSession");
  //     response.cookies.set("tokenExpired", "true");
  //     return response;
  //   }
  // }
  // return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

async function authenticateRequest(
  token: string,
  req: NextRequest
): Promise<ErrorToken> {
  const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI!));
  try {
    await jose.jwtVerify(token.replace("Bearer ", ""), jwks);
    return {
      code: "VALID_TOKEN",
      message: "Authentication successful",
    };
  } catch (error: any) {
    if (error?.code === "ERR_JWT_EXPIRED") {
      return {
        code: "ERR_JWT_EXPIRED",
        message: "Authentication failed: Token expired",
      };
    }

    return {
      code: "INVALID_TOKEN",
      message: "Authentication failed: Invalid token",
    };
  }
}
