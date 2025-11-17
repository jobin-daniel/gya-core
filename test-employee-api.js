/**
 * Test script for Employee API endpoint
 * This script tests the /api/employee/[id] endpoint
 */

import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

// Test credentials (update these with valid credentials from your database)
const TEST_CREDENTIALS = {
  email: "admin@example.com", // Update with actual admin email
  password: "password123", // Update with actual password
};

async function testEmployeeAPI() {
  console.log("🧪 Starting Employee API Tests\n");

  try {
    // Step 1: Login to get authentication token
    console.log("1️⃣ Testing Login...");
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TEST_CREDENTIALS),
    });

    if (!loginResponse.ok) {
      console.error("❌ Login failed:", await loginResponse.text());
      console.log("\n⚠️  Please update TEST_CREDENTIALS in test-employee-api.js with valid credentials");
      return;
    }

    const loginData = await loginResponse.json();
    console.log("✅ Login successful");
    console.log("   User ID:", loginData.user.id);
    console.log("   User Name:", loginData.user.name);
    console.log("   User Role:", loginData.user.role);

    // Extract cookies from response
    const cookies = loginResponse.headers.get("set-cookie");
    console.log("   Token received:", cookies ? "Yes" : "No");

    // Step 2: Test employee endpoint with authentication
    console.log("\n2️⃣ Testing Employee API with authentication...");
    const employeeResponse = await fetch(`${BASE_URL}/api/employee/${loginData.user.id}`, {
      method: "GET",
      headers: {
        Cookie: cookies || "",
        "Content-Type": "application/json",
      },
    });

    if (!employeeResponse.ok) {
      const errorText = await employeeResponse.text();
      console.log("⚠️  Employee API response:", employeeResponse.status, errorText);

      if (employeeResponse.status === 404) {
        console.log("   This is expected if no employee record exists for this user");
      }
    } else {
      const employeeData = await employeeResponse.json();
      console.log("✅ Employee data retrieved successfully");
      console.log("\n📋 Employee Details:");
      console.log("   Employee ID:", employeeData.employee.EmployeeId);
      console.log("   Full Name:", employeeData.employee.FullName);
      console.log("   Email:", employeeData.employee.EmailID);
      console.log("   Phone:", employeeData.employee.PhoneNumber || "Not provided");
      console.log("   Address:", employeeData.employee.FullAddress || "Not provided");
      console.log("   Role:", employeeData.employee.Role || "Not provided");
      console.log("   Joining Date:", employeeData.employee.JoiningDate || "Not provided");
    }

    // Step 3: Test employee endpoint without authentication
    console.log("\n3️⃣ Testing Employee API without authentication...");
    const unauthResponse = await fetch(`${BASE_URL}/api/employee/${loginData.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (unauthResponse.status === 401) {
      console.log("✅ Correctly returns 401 Unauthorized without token");
    } else {
      console.log("⚠️  Expected 401, got:", unauthResponse.status);
    }

    // Step 4: Test with invalid user ID
    console.log("\n4️⃣ Testing Employee API with invalid user ID...");
    const invalidResponse = await fetch(`${BASE_URL}/api/employee/99999`, {
      method: "GET",
      headers: {
        Cookie: cookies || "",
        "Content-Type": "application/json",
      },
    });

    if (invalidResponse.status === 403 || invalidResponse.status === 404) {
      console.log("✅ Correctly handles invalid user ID (status:", invalidResponse.status + ")");
    } else {
      console.log("⚠️  Unexpected status for invalid user ID:", invalidResponse.status);
    }

    console.log("\n✅ All tests completed!\n");
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
  }
}

// Run tests
testEmployeeAPI();
