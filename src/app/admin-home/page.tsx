"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminHome() {
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
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              You're logged in as <span className="font-semibold text-blue-600">{user.role}</span>
            </p>
          </div>

          {/* User Info Card */}
          <div className="max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/account.svg"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-semibold text-gray-900">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-semibold text-gray-900 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Courses Card */}
            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
              onClick={() => router.push("/courses")}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Image
                  src="/images/courses.svg"
                  alt="Courses"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Courses</h3>
              <p className="text-gray-600">Browse and manage courses</p>
            </div>

            {/* Institutes Card */}
            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
              onClick={() => router.push("/institutes")}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Image
                  src="/images/institutes.svg"
                  alt="Institutes"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Institutes</h3>
              <p className="text-gray-600">View and manage institutes</p>
            </div>

            {/* Help Card */}
            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
              onClick={() => router.push("/contact-us")}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Image
                  src="/images/help.svg"
                  alt="Help"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Help & Support</h3>
              <p className="text-gray-600">Get assistance and support</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100" data-aos="fade-up" data-aos-delay="500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                <div className="text-gray-600">Total Courses</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                <div className="text-gray-600">Total Institutes</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                <div className="text-gray-600">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
