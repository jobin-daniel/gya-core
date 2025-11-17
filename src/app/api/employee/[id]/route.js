import { NextResponse } from "next/server";
import { getEmployeeByUserId } from "../../../../lib/db.js";
import { verifyToken } from "../../../../lib/auth.js";

export async function GET(request, { params }) {
  try {
    // Check for token in cookies
    const token = request.cookies.get("token")?.value;

    const corsHeaders = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
    };

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token missing" },
        { status: 401, headers: corsHeaders }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401, headers: corsHeaders }
      );
    }

    // 🔧 FIX: Await params before accessing properties
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.id, 10);
    console.log("Employee user id:", userId);

    // --- Added Check ---
    if (isNaN(userId)) {
        return NextResponse.json(
            { error: "Invalid User ID format" },
            { status: 400, headers: corsHeaders }
        );
    }

    // Verify that the user is requesting their own data or is an admin
    const decodedUserId = parseInt(decoded.id, 10);

    if (decodedUserId !== userId && decoded.role !== "Admin" && decoded.role !== "SuperAdmin") {
      return NextResponse.json(
        { error: "Forbidden: You can only access your own employee data" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Fetch employee data from database
    const employee = await getEmployeeByUserId(userId);
    
    console.log("Employee:", employee);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee data not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { employee },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Error fetching employee data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      } }
    );
  }
}