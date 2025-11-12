/*
 * Login route using NextResponse for better Next.js integration
 */
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
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
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          }
        }
      );
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

    console.log('🔐 Token generated for user:', payload.email);
    console.log('🔐 Token length:', token.length);
    console.log('🔐 Token preview:', token.substring(0, 30) + '...');

    // Create response with NextResponse
    const response = NextResponse.json(
      { token, user: payload },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        }
      }
    );

    // Set cookie using NextResponse's cookies method
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Only secure in production
    });

    console.log('✅ Cookie set successfully for:', payload.email);
    console.log('🍪 Cookie config: httpOnly=true, sameSite=strict, secure=', process.env.NODE_ENV === "production");

    return response;
  } catch (error) {
    console.error("Login error:", error);
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