/*
 * Filename: /Users/jobindaniel/DEV/Jobin Daniel Inc/gya-core/src/app/unauthorized/page.tsx
 * Path: /Users/jobindaniel/DEV/Jobin Daniel Inc/gya-core
 * Created Date: Tuesday, November 11th 2025, 5:22:21 pm
 * Author: Jobin Daniel
 * 
 * Copyright (c) 2025 MissioRex Technologies LLP
 */
"use client";

import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unauthorised Access</h1>
        <p className="text-gray-600 mb-8">
          You need to log in to access this page. Your session may have timed out.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
