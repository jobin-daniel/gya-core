/*
 * ---------------------------------------------------------
 * File: db
 * Path: /src/lib
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
 * * Notes: MySQL Database Connection Pool
 * ---------------------------------------------------------
 */

import mysql from "mysql2/promise";

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "gya_service_user",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "gya_db",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test connection on startup
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ MySQL Database connection failed:", err.message);
  });

/**
 * Execute a query with parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("❌ Database query error:", error.message);
    throw error;
  }
}

/**
 * Get user by email with role information
 * Prioritizes Admin and SuperAdmin roles if user has multiple roles
 * @param {string} email - User email
 * @returns {Promise} User object with role
 */
export async function getUserByEmail(email) {
  const sql = `
    SELECT 
      u.UserId as id,
      CONCAT(u.FirstName, ' ', u.LastName) as name,
      u.Email as email,
      u.PhoneNumber as mobile,
      u.PasswordHash as password,
      ur.RoleName as role
    FROM users u
    LEFT JOIN userrolemappings urm ON u.UserId = urm.UserId
    LEFT JOIN userroles ur ON urm.RoleId = ur.RoleId
    WHERE u.Email = ?
    ORDER BY 
      CASE 
        WHEN ur.RoleName = 'SuperAdmin' THEN 1
        WHEN ur.RoleName = 'Admin' THEN 2
        ELSE 3
      END
    LIMIT 1
  `;

  const results = await query(sql, [email]);
  return results.length > 0 ? results[0] : null;
}

/**
 * Get user by mobile with role information
 * Prioritizes Admin and SuperAdmin roles if user has multiple roles
 * @param {string} mobile - User mobile number
 * @returns {Promise} User object with role
 */
export async function getUserByMobile(mobile) {
  const sql = `
    SELECT 
      u.UserId as id,
      CONCAT(u.FirstName, ' ', u.LastName) as name,
      u.Email as email,
      u.PhoneNumber as mobile,
      u.PasswordHash as password,
      ur.RoleName as role
    FROM users u
    LEFT JOIN userrolemappings urm ON u.UserId = urm.UserId
    LEFT JOIN userroles ur ON urm.RoleId = ur.RoleId
    WHERE u.PhoneNumber = ?
    ORDER BY 
      CASE 
        WHEN ur.RoleName = 'SuperAdmin' THEN 1
        WHEN ur.RoleName = 'Admin' THEN 2
        ELSE 3
      END
    LIMIT 1
  `;

  const results = await query(sql, [mobile]);
  return results.length > 0 ? results[0] : null;
}

/**
 * Check if user has required role
 * @param {string} role - User role
 * @param {Array} allowedRoles - Array of allowed roles
 * @returns {boolean} True if user has required role
 */
export function hasRequiredRole(role, allowedRoles = ["Admin", "SuperAdmin"]) {
  return allowedRoles.includes(role);
}

/**
 * Get employee details by UserId
 * @param {number} userId - User ID
 * @returns {Promise} Employee object with details
 */
export async function getEmployeeByUserId(userId) {
  const sql = `
    SELECT 
      e.EmployeeId,
      e.UserId,
      CONCAT(e.FirstName, ' ', COALESCE(e.MiddleName, ''), ' ', e.LastName) as FullName,
      e.FirstName,
      e.MiddleName,
      e.LastName,
      e.HouseNumberName,
      e.AddressLine1,
      e.AddressLine2,
      e.District,
      e.State,
      e.PostalCode,
      CONCAT_WS(', ', 
        NULLIF(e.HouseNumberName, ''),
        NULLIF(e.AddressLine1, ''),
        NULLIF(e.AddressLine2, ''),
        NULLIF(e.District, ''),
        NULLIF(e.State, ''),
        NULLIF(e.PostalCode, '')
      ) as FullAddress,
      e.EmailID,
      e.PhoneNumber,
      e.ImmediateToKin,
      e.EmergencyContact,
      e.TotalYearsOfExp,
      e.DOB,
      e.JoiningDate,
      e.Role,
      e.PhotoURL,
      e.CreatedAt,
      e.UpdatedAt
    FROM employees e
    WHERE e.UserId = ?
    LIMIT 1
  `;
console.log("User id in db:" , userId);
  const results = await query(sql, [userId]);
  return results.length > 0 ? results[0] : null;
}

export default pool;
