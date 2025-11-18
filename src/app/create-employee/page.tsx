"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function CreateEmployee() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    houseNumber: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
    yearsOfExp: '',
    password: '',
    confirmPassword: '',
    dob: '',
    joiningDate: '',
  });

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

          if (data.user?.role !== "SuperAdmin") {
            router.push("/");
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

    fetchUserData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (selectedRoles.length === 0) {
      alert("Please select at least one role");
      return;
    }

    setSubmitting(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      submitData.append('roles', JSON.stringify(selectedRoles));
      if (photoFile) {
        submitData.append('photo', photoFile);
      }

      const response = await fetch("/api/employees", {
        method: "POST",
        credentials: "include",
        body: submitData,
      });

      if (response.ok) {
        alert("Employee created successfully");
        router.push('/manage-employees');
      } else {
        const errorText = await response.text();
        alert("Error creating employee: " + errorText);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Error creating employee");
    } finally {
      setSubmitting(false);
    }
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Create New Employee
            </h1>
            <p className="text-xl text-gray-600">
              Welcome, {user.name}! Add a new employee to the system.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100" data-aos="fade-up" data-aos-delay="100">
            <form id="employeeForm" onSubmit={handleSubmit}>
              <table className="info-table" style={{ borderCollapse: 'collapse', border: 'none', width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>First Name</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="firstName"
                        maxLength={30}
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Middle Name</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="middleName"
                        maxLength={30}
                        value={formData.middleName}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Last Name</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="lastName"
                        maxLength={30}
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>House Number/Name</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="houseNumber"
                        maxLength={30}
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Address Line 1</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="addressLine1"
                        maxLength={30}
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Address Line 2</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="addressLine2"
                        maxLength={30}
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>District</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="district"
                        maxLength={30}
                        value={formData.district}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>State</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="state"
                        maxLength={30}
                        value={formData.state}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Postal Code</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="postalCode"
                        maxLength={6}
                        pattern="\d{6}"
                        title="Please enter exactly 6 digits"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Email ID</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="email"
                        name="email"
                        maxLength={30}
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Phone Number</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="phoneNumber"
                        maxLength={12}
                        pattern="\d{12}"
                        title="Please enter exactly 12 digits"
                        required
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Role</td>
                    <td style={{ border: 'none', padding: '8px', position: 'relative', width: '200px' }}>
                      <button
                        type="button"
                        id="dropdownBtn"
                        onClick={() => {
                          const dropdown = document.getElementById('dropdownContent');
                          if (dropdown) {
                            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                          }
                        }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: '#fff',
                          textAlign: 'left'
                        }}
                      >
                        Select Roles ({selectedRoles.length})
                      </button>
                      <div
                        id="dropdownContent"
                        style={{
                          display: 'none',
                          position: 'absolute',
                          backgroundColor: '#fff',
                          width: '100%',
                          border: '1px solid #ccc',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                          zIndex: 1,
                          maxHeight: '150px',
                          overflowY: 'auto'
                        }}
                      >
                        {['Admin', 'Institute RM', 'Student RM'].map(role => (
                          <label key={role} style={{ display: 'block', padding: '8px' }}>
                            <input
                              type="checkbox"
                              value={role}
                              checked={selectedRoles.includes(role)}
                              onChange={() => handleRoleChange(role)}
                            /> {role}
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Emergency Contact</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="emergencyContact"
                        maxLength={12}
                        pattern="\d{12}"
                        title="Please enter exactly 12 digits"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Total Years of Exp</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="yearsOfExp"
                        maxLength={2}
                        pattern="\d{1,2}"
                        title="Please enter up to 2 digits"
                        value={formData.yearsOfExp}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Password</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="password"
                        name="password"
                        maxLength={12}
                        required
                        title="Enter a Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Confirm Password</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="password"
                        name="confirmPassword"
                        maxLength={12}
                        required
                        title="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>DOB (DD/MM/YYYY)</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="dob"
                        maxLength={10}
                        pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/\d{4}"
                        title="Please enter in DD/MM/YYYY format"
                        value={formData.dob}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Joining Date (DD/MM/YYYY)</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <input
                        type="text"
                        name="joiningDate"
                        maxLength={10}
                        pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/\d{4}"
                        title="Please enter in DD/MM/YYYY format"
                        value={formData.joiningDate}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '8px', fontWeight: 'bold', color: '#374151' }}>Upload Photo</td>
                    <td style={{ border: 'none', padding: '8px' }}>
                      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/4/47/File_icon.svg"
                          alt="Upload File"
                          style={{ width: '30px', height: '30px', border: 'none', outline: 'none' }}
                        />
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        name="photo"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      {photoFile && <span style={{ marginLeft: '10px' }}>{photoFile.name}</span>}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors mr-4"
                >
                  {submitting ? "Creating..." : "Create Employee"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/manage-employees')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
