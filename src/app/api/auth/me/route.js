/*
 * ---------------------------------------------------------
 * File: route
 * Path: /src/app/api/auth/me
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
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Import verifyToken here
    const { verifyToken } = await import("../../../../lib/auth.js");

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Return user data (in real app, fetch from DB using decoded.id)
    const user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
