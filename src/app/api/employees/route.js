import { NextResponse } from "next/server";
import { getAllEmployees, deleteEmployees, createEmployee } from "../../../lib/db.js";
import { verifyToken } from "../../../lib/auth.js";

export async function GET(request) {
  try {
    // Check for token in cookies
    const token = request.cookies.get("token")?.value;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    };

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401, headers: corsHeaders });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401, headers: corsHeaders });
    }

    // Only SuperAdmin can access all employees
    if (decoded.role !== "SuperAdmin") {
      return NextResponse.json({ error: "Forbidden: Only SuperAdmin can access employee list" }, { status: 403, headers: corsHeaders });
    }

    // Fetch all employees
    const employees = await getAllEmployees();

    return NextResponse.json({ employees }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
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

export async function DELETE(request) {
  try {
    // Check for token in cookies
    const token = request.cookies.get("token")?.value;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    };

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401, headers: corsHeaders });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401, headers: corsHeaders });
    }

    // Only SuperAdmin can delete employees
    if (decoded.role !== "SuperAdmin") {
      return NextResponse.json({ error: "Forbidden: Only SuperAdmin can delete employees" }, { status: 403, headers: corsHeaders });
    }

    // Get employee IDs from request body
    const body = await request.json();
    const { employeeIds } = body;

    if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
      return NextResponse.json({ error: "Invalid request: employeeIds array required" }, { status: 400, headers: corsHeaders });
    }

    // Delete employees
    const result = await deleteEmployees(employeeIds);

    return NextResponse.json({ message: `Successfully deleted ${result.affectedRows} employees` }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("❌ Error deleting employees:", error);
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

export async function POST(request) {
  try {
    // Check for token in cookies
    const token = request.cookies.get("token")?.value;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    };

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401, headers: corsHeaders });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401, headers: corsHeaders });
    }

    // Only SuperAdmin can create employees
    if (decoded.role !== "SuperAdmin") {
      return NextResponse.json({ error: "Forbidden: Only SuperAdmin can create employees" }, { status: 403, headers: corsHeaders });
    }

    // Parse form data
    const formData = await request.formData();
    const employeeData = {
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      houseNumber: formData.get("houseNumber"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2"),
      district: formData.get("district"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      emergencyContact: formData.get("emergencyContact"),
      yearsOfExp: formData.get("yearsOfExp"),
      password: formData.get("password"),
      dob: formData.get("dob"),
      joiningDate: formData.get("joiningDate"),
    };

    const rolesString = formData.get("roles");
    const roles = rolesString ? JSON.parse(rolesString) : [];
    const photoFile = formData.get("photo");

    // Validate required fields
    if (!employeeData.firstName || !employeeData.lastName || !employeeData.email || 
        !employeeData.phoneNumber || !employeeData.postalCode || !employeeData.password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400, headers: corsHeaders });
    }

    // Create employee
    const employee = await createEmployee(employeeData, roles, photoFile);

    return NextResponse.json({ employee, message: "Employee created successfully" }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("❌ Error creating employee:", error);
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

