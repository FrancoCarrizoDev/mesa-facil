import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const currentUrl = request.url;
  const { pathname } = request.nextUrl;
  const { user, accessToken } = (await getSession(request, res)) ?? {};

  if (pathname.includes("api") && !pathname.includes("auth")) {
    if (accessToken) {
      return await authenticateRequest(accessToken);
    } else {
      const response = NextResponse.redirect(
        new URL("/", request.nextUrl.origin)
      );
      response.cookies.set("loginRequired", "true");
      return response;
    }
  }

  if (pathname.includes("logout")) {
    res.cookies.delete("loginRequired");
    res.cookies.delete("tokenExpired");
    return res;
  }
  if (currentUrl.endsWith("/") && user) {
    const nextUrl = new URL("/private", request.nextUrl.origin);
    return NextResponse.redirect(nextUrl);
  }
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

async function authenticateRequest(token: string) {
  const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI!));
  try {
    await jose.jwtVerify(token.replace("Bearer ", ""), jwks);
    return NextResponse.next();
  } catch (error: any) {
    console.log({ error: JSON.stringify(error) });

    if (error?.code === "ERR_JWT_EXPIRED") {
      const response = NextResponse.redirect(
        new URL("/api/auth/logout", process.env.AUTH0_BASE_URL)
      );
      response.cookies.set("tokenExpired", "true");
      return response;
    }

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Authentication failed: Token could not be verified",
      }),
      {
        status: 401,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
