/*
 * ---------------------------------------------------------
 * File: middleware
 * Path: /src
 * Project Name: gya-core
 * Author: Jobin Daniel , MissioRex Technologies LLP
 * Contact: support@missioRex.com
 * -----
 * Last Modified: Tue Nov 11 2025
 * Modified By: Jobin Daniel
 * -----
 * Copyright (c) 2025 MissioRex Technologies LLP
 * -----
 * HISTORY:
 * Date      	By	Comments
 * * Notes:
 * ---------------------------------------------------------
 */

export const runtime = 'nodejs'; // Force Node.js runtime for crypto support

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth.js";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/unauthorized",
    "/student-signup",
    "/institute-signup",
    "/forgot-password",
    "/contact-us",
    "/api",

  ];

  // Check if current path is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Skip middleware for static files, public assets, and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/css/") ||
    pathname.startsWith("/js/") ||
    pathname.startsWith("/gya/") ||
    pathname.match(/\.(svg|ico|png|jpg|jpeg|gif|css|js|woff|eot|ttf|map|scss)$/)
  ) {
    // Protect internal API routes
    if (pathname.startsWith("/api/internal/")) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.substring(7);
      if (!token || !verifyToken(token)) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // For all protected pages, check for token cookie
  const token = request.cookies.get("token")?.value;
  
  if (!token) {
    console.log("No token found in cookies for:", pathname);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    console.log("Invalid token for:", pathname);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|images|css|js|gya).*)",
  ],
};