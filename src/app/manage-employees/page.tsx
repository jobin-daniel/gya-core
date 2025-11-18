"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function ManageEmployees() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the auth API
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // If not authenticated, redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Manage Employees
            </h1>
            <p className="text-xl text-gray-600">
              Welcome, {user.name}! You are logged in as <span className="font-semibold text-blue-600">{user.role}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
