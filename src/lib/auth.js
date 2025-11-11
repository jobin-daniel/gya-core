/*
 * ---------------------------------------------------------
 * File: auth
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
 * * Notes:
 * ---------------------------------------------------------
 */
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function decodeToken(token) {
  return jwt.decode(token);
}

export function getAuthHeader() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}
