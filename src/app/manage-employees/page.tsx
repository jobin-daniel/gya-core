"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  EmailID: string;
  PhoneNumber?: string;
  Role?: string;
  JoiningDate?: string;
  StudentsAssigned: number;
  InstitutesAssigned: number;
}

export default function ManageEmployees() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [deleting, setDeleting] = useState(false);

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

          // Fetch employees data after getting user data
          if (data.user?.role === "SuperAdmin") {
            fetchEmployeesData();
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

    const fetchEmployeesData = async () => {
      setEmployeesLoading(true);

      try {
        const response = await fetch("/api/employees", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setEmployees(data.employees);
        } else {
          const errorText = await response.text();
          console.error("Error fetching employees data:", errorText);
        }
      } catch (error) {
        console.error("Error fetching employees data:", error);
      } finally {
        setEmployeesLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSelectEmployee = (employeeId: number) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.EmployeeId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEmployees.length === 0) return;

    const confirmed = confirm(`Are you sure you want to delete ${selectedEmployees.length} employee(s)?`);
    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch("/api/employees", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ employeeIds: selectedEmployees }),
      });

      if (response.ok) {
        // Refresh employees list
        const fetchResponse = await fetch("/api/employees", {
          method: "GET",
          credentials: "include",
        });

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setEmployees(data.employees);
        }

        setSelectedEmployees([]);
        alert("Employees deleted successfully");
      } else {
        const errorText = await response.text();
        alert("Error deleting employees: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting employees:", error);
      alert("Error deleting employees");
    } finally {
      setDeleting(false);
    }
  };

  const handleEditEmployee = (employeeId: number) => {
    router.push(`/edit-employee?id=${employeeId}`);
  };

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

  if (user.role !== "SuperAdmin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
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

          {/* Create Employee Button */}
          <div className="mb-6 text-center" data-aos="fade-up" data-aos-delay="50">
            <button
              onClick={() => router.push('/create-employee')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create New Employee
            </button>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100" data-aos="fade-up" data-aos-delay="100">
            {employeesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading employees...</p>
              </div>
            ) : (
              <form id="manageEmployeeForm" onSubmit={(e) => { e.preventDefault(); handleDeleteSelected(); }}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.length === employees.length && employees.length > 0}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Employee Name
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Employee Number
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Email ID
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Phone Number
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Students Assigned
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Institutes Assigned
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.EmployeeId} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              value={employee.EmployeeId}
                              checked={selectedEmployees.includes(employee.EmployeeId)}
                              onChange={() => handleSelectEmployee(employee.EmployeeId)}
                              className="rounded"
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleEditEmployee(employee.EmployeeId)}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {employee.FullName}
                            </button>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                            EMP{employee.EmployeeId.toString().padStart(3, '0')}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                            {employee.EmailID}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                            {employee.PhoneNumber || "Not provided"}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                            {employee.Role || "Not specified"}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => router.push(`/admin/my-students?employeeId=${employee.EmployeeId}`)}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {employee.StudentsAssigned}
                            </button>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => router.push(`/admin/my-institutes?employeeId=${employee.EmployeeId}`)}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {employee.InstitutesAssigned}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {employees.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No employees found</p>
                  </div>
                )}

                {selectedEmployees.length > 0 && (
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={deleting}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      {deleting ? "Deleting..." : `Delete Selected (${selectedEmployees.length})`}
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
