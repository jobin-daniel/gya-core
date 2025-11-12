/*
 * Filename: /Users/jobindaniel/DEV/Jobin Daniel Inc/gya-core/src/app/components/LoggedInUser.tsx
 * Path: /Users/jobindaniel/DEV/Jobin Daniel Inc/gya-core
 * Created Date: Tuesday, November 11th 2025, 9:29:08 pm
 * Author: Jobin Daniel
 * 
 * Copyright (c) 2025 MissioRex Technologies LLP
 */


import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface LoggedInUserProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const LoggedInUser: React.FC<LoggedInUserProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative cursor-pointer select-none" onClick={() => setDropdownOpen((s) => !s)}>
      <span className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
        <Image src="/images/account.svg" alt="User" width={23} height={22} />
        <span>{user.name}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden
        >
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div
        className={`absolute top-full right-0 mt-3 p-2 bg-white border border-gray-100 rounded-lg shadow-xl z-50 w-48 transition-all duration-300 origin-top-right ${
          dropdownOpen ? 'opacity-100 scale-100 visible pointer-events-auto' : 'opacity-0 scale-95 invisible pointer-events-none'
        }`}
      >
        <div className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">
          {user.email}
        </div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          title="Logout"
          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default LoggedInUser;
