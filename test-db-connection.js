import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("Testing database connection...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "***SET***" : "***NOT SET***");

async function testConnection() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "gya_service_user",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "gya_db",
      port: parseInt(process.env.DB_PORT || "3306"),
    });

    console.log("\nAttempting to connect...");
    const connection = await pool.getConnection();
    console.log("✅ Database connection successful!");

    // Test a simple query
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("✅ Query test successful:", rows);

    // Test users table
    const [users] = await connection.execute("SELECT COUNT(*) as count FROM users");
    console.log("✅ Users table accessible. Count:", users[0].count);

    // Test userroles table
    const [roles] = await connection.execute("SELECT * FROM userroles");
    console.log("✅ User roles found:", roles);

    connection.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Error code:", error.code);
    console.error("Error errno:", error.errno);
    process.exit(1);
  }
}

testConnection();
