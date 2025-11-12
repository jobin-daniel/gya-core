'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';
import LoggedInUser from './LoggedInUser';
import { verifyToken } from '../../lib/auth.js';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const DropdownArrow: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
    aria-hidden
  >
    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header: React.FC = () => {
  const router = useRouter();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleAccountDropdown = () => setAccountDropdownOpen((s) => !s);

  const handleLoginClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowLoginModal(true);
    setAccountDropdownOpen(false);
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAccountDropdownOpen(false);
    router.push('/');
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Click-outside and Escape handling to close dropdown
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setAccountDropdownOpen(false);
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="py-4 shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand / title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="GYA Home Page"
                width={140}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Middle: (optional) main nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors group">
              <Image
                src="/images/courses.svg"
                alt=""
                width={24}
                height={24}
                className="mb-1 group-hover:text-blue-600"
              />
              <span>Courses</span>
            </Link>
            <Link href="/institutes" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors group">
              <Image
                src="/images/institutes.svg"
                alt=""
                width={24}
                height={24}
                className="mb-1 group-hover:text-blue-600"
              />
              <span>Institutes</span>
            </Link>
          </nav>

          {/* Right Box - Help and Account */}
          <div className="flex items-center space-x-6">
            <a href="/contact-us" title="Help" className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Image src="/images/help.svg" alt="Help" width={22} height={22} />
              <span>Help</span>
            </a>

            {user ? (
              <LoggedInUser user={user} onLogout={handleLogout} />
            ) : (
              <div ref={wrapperRef} className="relative cursor-pointer select-none" onClick={toggleAccountDropdown}>
                <span className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <Image src="/images/account.svg" alt="Account" width={23} height={22} />
                  <span>Account</span>
                  <DropdownArrow isOpen={accountDropdownOpen} />
                </span>
                <div
                  className={`absolute top-full right-0 mt-3 p-2 bg-white border border-gray-100 rounded-lg shadow-xl z-50 w-48 transition-all duration-300 origin-top-right ${
                    accountDropdownOpen
                      ? 'opacity-100 scale-100 visible pointer-events-auto'
                      : 'opacity-0 scale-95 invisible pointer-events-none'
                  }`}
                >
                  <a
                    href="#"
                    onClick={handleLoginClick}
                    title="Login"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors border-b border-gray-100"
                  >
                    Login
                  </a>
                  <a
                    href="/student-signup"
                    title="Student Sign Up"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors border-b border-gray-100"
                  >
                    Student Sign Up
                  </a>
                  <a
                    href="/institute-signup"
                    title="Institute Sign Up"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    Institute Sign Up
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          console.log('🚪 Closing login modal');
          setShowLoginModal(false);
          // Re-check auth status when modal closes
          checkAuthStatus();
        }}
        onLoginSuccess={(userData) => {
          console.log('🎉 Login success callback in Header:', userData);

          // Close modal immediately
          setShowLoginModal(false);

          // Re-check auth status to get user data from server
          setTimeout(() => {
            checkAuthStatus();
          }, 100);
        }}
      />
    </header>
  );
};

export default Header;