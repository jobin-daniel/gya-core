/*
 * Login route using NextResponse for better Next.js integration
 * Updated with MySQL database authentication and role-based access control
 */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserByMobile, hasRequiredRole } from "../../../../lib/db.js";
import { signToken } from "../../../../lib/auth.js";

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

    console.log("🔐 Login attempt:", { email: email || "N/A", mobile: mobile || "N/A" });

    // Validate input
    if ((!email && !mobile) || !password) {
      console.log("❌ Missing credentials");
      return NextResponse.json(
        { error: "Email/Mobile and password are required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    // Fetch user from database
    let user = null;
    if (email) {
      console.log("🔍 Looking up user by email:", email);
      user = await getUserByEmail(email);
    } else if (mobile) {
      console.log("🔍 Looking up user by mobile:", mobile);
      user = await getUserByMobile(mobile);
    }

    // Check if user exists
    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    console.log("✅ User found:", { id: user.id, email: user.email, role: user.role });

    // Verify password - check if it's bcrypt or plain text
    let isPasswordValid = false;

    // Check if password is bcrypt hashed (starts with $2a$, $2b$, or $2y$)
    if (user.password && user.password.startsWith("$2")) {
      console.log("🔐 Using bcrypt verification");
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Plain text password comparison (for development/testing)
      console.log("⚠️  Using plain text password comparison");
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    console.log("✅ Password verified");

    // Check if user has required role (Admin or SuperAdmin)
    if (!hasRequiredRole(user.role)) {
      console.log("❌ Insufficient permissions. User role:", user.role);
      return NextResponse.json(
        { error: "Access denied. Only Admin and SuperAdmin users can login." },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    console.log("✅ Role verified:", user.role);

    // Create JWT payload (exclude password)
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };

    // Generate JWT token
    const token = signToken(payload);

    console.log("🔐 Token generated for user:", payload.email);
    console.log("🔐 Token length:", token.length);
    console.log("🔐 Token preview:", token.substring(0, 30) + "...");

    // Create response with NextResponse
    const response = NextResponse.json(
      { token, user: payload },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
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

    console.log("✅ Cookie set successfully for:", payload.email);
    console.log("🍪 Cookie config: httpOnly=true, sameSite=strict, secure=", process.env.NODE_ENV === "production");

    return response;
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
}
