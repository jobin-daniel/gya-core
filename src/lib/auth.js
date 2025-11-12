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

console.log('🔑 JWT_SECRET loaded:', JWT_SECRET ? 'Yes (length: ' + JWT_SECRET.length + ')' : 'No - using default');

export function signToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  console.log('🔐 Token signed with secret length:', JWT_SECRET.length);
  return token;
}

export function verifyToken(token) {
  try {
    console.log('🔍 Attempting to verify token...');
    console.log('🔍 Secret being used for verification:', JWT_SECRET ? 'present (length: ' + JWT_SECRET.length + ')' : 'missing');
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token verified successfully:', decoded.email);
    return decoded;
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    console.error('❌ Error name:', error.name);
    
    if (error.name === 'TokenExpiredError') {
      console.error('❌ Token has expired at:', error.expiredAt);
    } else if (error.name === 'JsonWebTokenError') {
      console.error('❌ JWT error - possibly wrong secret or malformed token');
    }
    
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