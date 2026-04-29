import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const DASHBOARD_PATH = /^\/dashboard(\/.*)?$/;
const AUTH_PATH = /^\/auth(\/.*)?$/;

interface DecodedUser {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const token = request.cookies.get("driveSocietyAccessToken")?.value;

  let decodedUser: DecodedUser | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      decodedUser = jwtDecode<DecodedUser>(token);

      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedUser.exp < currentTime) {
        console.log("Token has expired");
        decodedUser = null
      } else {
        isAuthenticated = true
      }

      if (isAuthenticated && decodedUser?.role !== "admin") {
        toast.warning("User does not have the required role (admin)");
        isAuthenticated = false;
        decodedUser = null;
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      decodedUser = null;
      isAuthenticated = false;
    }
  }

  if (DASHBOARD_PATH.test(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname + (searchParams.toString() ? `?${searchParams}` : ""));
      return NextResponse.redirect(loginUrl);
    }
    const response = NextResponse.next();
    if (decodedUser) {
      response.headers.set("x-decoded-user", JSON.stringify(decodedUser));
    }
    return response;
  }

  if (AUTH_PATH.test(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};