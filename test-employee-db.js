/**
 * Test script for Employee Database Function
 * This script tests the getEmployeeByUserId function
 */

import { getEmployeeByUserId } from "./src/lib/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testEmployeeDB() {
  console.log("🧪 Testing Employee Database Function\n");

  try {
    // Test with user ID 1 (update this with a valid user ID from your database)
    const testUserId = 1;

    console.log(`📊 Fetching employee data for User ID: ${testUserId}...`);
    const employee = await getEmployeeByUserId(testUserId);

    if (employee) {
      console.log("✅ Employee data found!\n");
      console.log("📋 Employee Details:");
      console.log("   Employee ID:", employee.EmployeeId);
      console.log("   User ID:", employee.UserId);
      console.log("   Full Name:", employee.FullName);
      console.log("   First Name:", employee.FirstName);
      console.log("   Middle Name:", employee.MiddleName || "N/A");
      console.log("   Last Name:", employee.LastName);
      console.log("   Email:", employee.EmailID);
      console.log("   Phone:", employee.PhoneNumber || "Not provided");
      console.log("   Full Address:", employee.FullAddress || "Not provided");
      console.log("   Role:", employee.Role || "Not provided");
      console.log("   Joining Date:", employee.JoiningDate || "Not provided");
      console.log("   DOB:", employee.DOB || "Not provided");
      console.log("   Years of Experience:", employee.TotalYearsOfExp || 0);
      console.log("   Photo URL:", employee.PhotoURL || "Not provided");
      console.log("   Created At:", employee.CreatedAt);
      console.log("   Updated At:", employee.UpdatedAt);
    } else {
      console.log("⚠️  No employee data found for User ID:", testUserId);
      console.log("   This is expected if no employee record exists in the database");
    }

    // Test with non-existent user ID
    console.log("\n📊 Testing with non-existent User ID (99999)...");
    const nonExistent = await getEmployeeByUserId(99999);

    if (!nonExistent) {
      console.log("✅ Correctly returns null for non-existent user");
    } else {
      console.log("⚠️  Unexpected: Found data for non-existent user");
    }

    console.log("\n✅ Database function test completed!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed with error:", error.message);
    console.error("   Stack:", error.stack);
    process.exit(1);
  }
}

// Run test
testEmployeeDB();
