/*
 * ---------------------------------------------------------
 * File: route
 * Path: /src/app/api/auth/login
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
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request) {
  try {
    const { email, mobile, password } = await request.json();

    // Simulate user lookup (dummy user)
    const dummyUser = {
      id: 1,
      name: "Admin User",
      email: "admin@gya.com",
      mobile: "1234567890",
      role: "admin",
      password: "password123", // In real app, this would be hashed
    };

    // Check credentials
    const isValidEmail = email === dummyUser.email && password === dummyUser.password;
    const isValidMobile = mobile === dummyUser.mobile && password === dummyUser.password;

    if (!isValidEmail && !isValidMobile) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Import signToken here to avoid issues
    const { signToken } = await import("../../../../lib/auth.js");

    const payload = {
      id: dummyUser.id,
      name: dummyUser.name,
      email: dummyUser.email,
      role: dummyUser.role,
    };

    const token = signToken(payload);

    return new Response(JSON.stringify({ token, user: payload }), {
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
