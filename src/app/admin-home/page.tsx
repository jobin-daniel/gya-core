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

interface Employee {
  EmployeeId: number;
  UserId: number;
  FullName: string;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  FullAddress: string;
  EmailID: string;
  PhoneNumber?: string;
  Role?: string;
  JoiningDate?: string;
  DOB?: string;
  TotalYearsOfExp?: number;
  PhotoURL?: string;
}

export default function AdminHome() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [employeeLoading, setEmployeeLoading] = useState(false);

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
          
          // Fetch employee data after getting user data
          if (data.user?.id) {
            fetchEmployeeData(data.user.id);
          }
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

    const fetchEmployeeData = async (userId: number) => {
      setEmployeeLoading(true);
      console.log("userid from page :"  ,userId);
      try {
        const response = await fetch(`/api/employee/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setEmployee(data.employee);
        } else {
          const errorText = await response.text();
          // Only log as error for actual server errors, not for missing employee data
          if (response.status === 404) {
            console.log("No employee data found for this user");
            setEmployee(null);
          } else {
            console.error("Error fetching employee data:", errorText);
          }
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setEmployeeLoading(false);
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

          {/* Employee Info Card */}
          <div className="max-w-4xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              {/* Employee Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image
                    src={employee?.PhotoURL || "/images/account.svg"}
                    alt="Employee"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {employee?.FullName || user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              {/* My Information Section */}
              {employeeLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading employee details...</p>
                </div>
              ) : employee ? (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">My Information</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                            Employee ID
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900 w-1/4">
                            {employee.EmployeeId}
                          </td>
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                            Employee Address
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900 w-1/4">
                            {employee.FullAddress || "Not provided"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Contact Number
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {employee.PhoneNumber || "Not provided"}
                          </td>
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Email ID
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {employee.EmailID}
                          </td>
                        </tr>
                        <tr>
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            My Role
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {employee.Role || user.role}
                          </td>
                          <th className="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Employed From
                          </th>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {employee.JoiningDate
                              ? new Date(employee.JoiningDate).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                              : "Not provided"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* My Links Section */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">My Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => router.push("/courses")}
                      className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Image
                        src="/images/courses.svg"
                        alt="Courses"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span className="font-semibold text-blue-700">Courses</span>
                    </button>
                    <button
                      onClick={() => router.push("/institutes")}
                      className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Image
                        src="/images/institutes.svg"
                        alt="Institutes"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span className="font-semibold text-green-700">Institutes</span>
                    </button>
                    <button
                      onClick={() => router.push("/contact-us")}
                      className="flex items-center justify-center px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <Image
                        src="/images/help.svg"
                        alt="Help"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span className="font-semibold text-purple-700">Help & Support</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No employee data found</p>
                </div>
              )}
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
