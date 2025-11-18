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

import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

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
  console.log("User id in db:", userId);
  const results = await query(sql, [userId]);
  return results.length > 0 ? results[0] : null;
}

/**
 * Get all employees with user information
 * @returns {Promise} Array of employee objects
 */
export async function getAllEmployees() {
  const sql = `
    SELECT
      e.EmployeeId,
      e.UserId,
      CONCAT(e.FirstName, ' ', COALESCE(e.MiddleName, ''), ' ', e.LastName) as FullName,
      e.FirstName,
      e.MiddleName,
      e.LastName,
      e.EmailID,
      e.PhoneNumber,
      e.Role,
      e.JoiningDate,
      e.CreatedAt,
      e.UpdatedAt,
      COALESCE(COUNT(DISTINCT sa.StudentId), 0) as StudentsAssigned,
      COALESCE(COUNT(DISTINCT ia.InstituteId), 0) as InstitutesAssigned
    FROM employees e
    LEFT JOIN studentassignments sa ON sa.EmployeeId = e.EmployeeId
    LEFT JOIN instituteassignments ia ON ia.AssignedEmployeeId = e.EmployeeId
    GROUP BY
      e.EmployeeId,
      e.UserId,
      e.FirstName,
      e.MiddleName,
      e.LastName,
      e.EmailID,
      e.PhoneNumber,
      e.Role,
      e.JoiningDate,
      e.CreatedAt,
      e.UpdatedAt
    ORDER BY e.CreatedAt DESC
  `;

  const results = await query(sql);
  return results;
}

/**
 * Delete employees by IDs
 * @param {Array} employeeIds - Array of employee IDs to delete
 * @returns {Promise} Result of deletion
 */
export async function deleteEmployees(employeeIds) {
  if (!employeeIds || employeeIds.length === 0) {
    throw new Error("No employee IDs provided");
  }

  const placeholders = employeeIds.map(() => "?").join(",");
  const sql = `DELETE FROM employees WHERE EmployeeId IN (${placeholders})`;

  const results = await query(sql, employeeIds);
  return results;
}

export default pool;

/**
 * Create a new employee with user account and roles
 * @param {Object} employeeData - Employee data
 * @param {Array} roles - Array of role names
 * @param {File} photoFile - Photo file (optional)
 * @returns {Promise} Created employee object
 */
export async function createEmployee(employeeData, roles, photoFile = null) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Hash the password
    const hashedPassword = await bcrypt.hash(employeeData.password, 10);

    // Insert into users table
    const userSql = `
      INSERT INTO users (FirstName, LastName, Email, PhoneNumber, PasswordHash, CreatedAt, UpdatedAt)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const userValues = [employeeData.firstName, employeeData.lastName, employeeData.email, employeeData.phoneNumber, hashedPassword];

    const [userResult] = await connection.execute(userSql, userValues);
    const userId = userResult.insertId;

    // Handle photo upload if provided
    let photoUrl = null;
    if (photoFile) {
      const uploadDir = path.join(process.cwd(), "public", "images", "EmployeePhotos", userId.toString());
      await fs.mkdir(uploadDir, { recursive: true });

      const fileExtension = path.extname(photoFile.name);
      const fileName = `photo${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await photoFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      photoUrl = `/images/EmployeePhotos/${userId}/${fileName}`;
    }

    // Parse dates from DD/MM/YYYY to YYYY-MM-DD
    const parseDob = employeeData.dob ? employeeData.dob.split("/").reverse().join("-") : null;
    const parseJoiningDate = employeeData.joiningDate ? employeeData.joiningDate.split("/").reverse().join("-") : null;

    // Insert into employees table
    const employeeSql = `
      INSERT INTO employees (
        UserId, FirstName, MiddleName, LastName, HouseNumberName, AddressLine1, AddressLine2,
        District, State, PostalCode, EmailID, PhoneNumber, ImmediateToKin, EmergencyContact,
        TotalYearsOfExp, DOB, JoiningDate, Role, PhotoURL, CreatedAt, UpdatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const employeeValues = [
      userId,
      employeeData.firstName,
      employeeData.middleName || null,
      employeeData.lastName,
      employeeData.houseNumber || null,
      employeeData.addressLine1 || null,
      employeeData.addressLine2 || null,
      employeeData.district || null,
      employeeData.state || null,
      employeeData.postalCode,
      employeeData.email,
      employeeData.phoneNumber,
      employeeData.emergencyContact || null,
      employeeData.emergencyContact || null,
      employeeData.yearsOfExp || null,
      parseDob,
      parseJoiningDate,
      roles.join(", "),
      photoUrl,
    ];

    const [employeeResult] = await connection.execute(employeeSql, employeeValues);
    const employeeId = employeeResult.insertId;

    // Insert roles into userrolemappings
    for (const roleName of roles) {
      const roleSql = `SELECT RoleId FROM userroles WHERE RoleName = ?`;
      const [roleResult] = await connection.execute(roleSql, [roleName]);

      if (roleResult.length > 0) {
        const roleId = roleResult[0].RoleId;
        const mappingSql = `INSERT INTO userrolemappings (UserId, RoleId) VALUES (?, ?)`;
        await connection.execute(mappingSql, [userId, roleId]);
      }
    }

    await connection.commit();

    return {
      EmployeeId: employeeId,
      UserId: userId,
      FullName: `${employeeData.firstName} ${employeeData.middleName || ""} ${employeeData.lastName}`.trim(),
      EmailID: employeeData.email,
      PhoneNumber: employeeData.phoneNumber,
      Role: roles.join(", "),
      PhotoURL: photoUrl,
    };
  } catch (error) {
    await connection.rollback();
    console.error("❌ Error creating employee:", error);
    throw error;
  } finally {
    connection.release();
  }
}
