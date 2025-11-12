/*
 * ---------------------------------------------------------
 * File: route
 * Path: /src/app/api/auth/logout
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
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Create response
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        }
      }
    );

    // Clear the token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0, // Expire immediately
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    console.log('✅ Cookie cleared successfully');

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        }
      }
    );
  }
}
