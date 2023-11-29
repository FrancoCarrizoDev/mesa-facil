import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const currentUrl = request.url;
  const { pathname } = request.nextUrl;
  const { user } = (await getSession(request, res)) ?? {};

  if (pathname.includes("api") && !pathname.includes("auth")) {
    const token = request.headers.get("Authorization");
    if (token) {
      return await authenticateRequest(token);
    } else {
      return (
        NextResponse.json({
          success: false,
          message: "Authentication failed: No token given",
        }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
  }

  if (pathname.includes("logout")) {
    res.cookies.delete("loginRequired");
    return res;
  }
  if (currentUrl.endsWith("/") && user) {
    const nextUrl = new URL("/private", request.nextUrl.origin);
    return NextResponse.redirect(nextUrl);
  }

  if (request.url.endsWith("/private")) {
    if (!user) {
      const nextUrl = new URL("/", request.nextUrl.origin);
      const response = NextResponse.redirect(nextUrl);
      response.cookies.set("loginRequired", "true");
      return response;
    }

    return NextResponse.next();
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
  } catch (error) {
    console.log({ error });
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
