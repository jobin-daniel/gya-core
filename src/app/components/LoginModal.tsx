/*
 * Filename: /Users/jobindaniel/Desktop/nextjs-app/src/components/LoginModal.tsx
 * Path: /Users/jobindaniel/Desktop/nextjs-app
 * Created Date: Monday, November 10th 2025, 4:58:40 pm
 * Author: Jobin Daniel
 * 
 * Copyright (c) 2025 MissioRex Technologies LLP
 */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed rounded-lg inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg shadow-lg w-[60vw] h-[60vh] border-18 border-gray-100 flex overflow-hidden relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.212402 1.25149C-0.0688477 0.970238 -0.0688477 0.502144 0.212402 0.21106C0.503486 -0.0701904 0.961747 -0.0701904 1.25283 0.21106L7.49606 6.46477L13.7498 0.21106C14.031 -0.0701904 14.4991 -0.0701904 14.7797 0.21106C15.0708 0.502144 15.0708 0.970894 14.7797 1.25149L8.53649 7.49537L14.7797 13.7491C15.0708 14.0303 15.0708 14.4984 14.7797 14.7895C14.4985 15.0708 14.0304 15.0708 13.7498 14.7895L7.49606 8.5358L1.25283 14.7895C0.961747 15.0708 0.503486 15.0708 0.212402 14.7895C-0.0688477 14.4984 -0.0688477 14.0297 0.212402 13.7491L6.45563 7.49537L0.212402 1.25149Z" fill="#4A4A4A"/>
          </svg>
        </button>
        {/* Left side - Image */}
        <div className="w-1/2 relative bg-white min-h-[600px]">
          <div className="h-full">
            <div className="relative h-full flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800 p-6 text-center">Welcome</h3>
              <div className="relative flex-1">
                <picture className="block w-full h-full">
                  <source
                    media="(min-width: 1200px)"
                    srcSet={`/images/login-img-desk.png`}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={`/images/login-img-tablet.png`}
                  />
                  <Image
                    src="/images/login-img-desk.png"
                    alt="Institute Name Will Come Here"
                    className="w-full h-full object-cover"
                    fill
                    quality={100}
                    sizes="(min-width: 1200px) 50vw, (min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-1/2 p-8 flex flex-col">
          
          {/* Logo in the middle */}
          <div className="flex justify-center items-center my-4">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="mb-6"
              priority
            />
          </div>
          
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 underline text-center"
              onClick={() => onClose()} // Close modal when navigating to forgot password
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
