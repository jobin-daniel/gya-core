/*
 * Filename: /Users/jobindaniel/DEV/Jobin Daniel Inc/bb_lab/nextjs-app/src/app/courses/page.tsx
 * Path: /Users/jobindaniel/DEV/Jobin Daniel Inc/bb_lab/nextjs-app
 * Created Date: Monday, November 10th 2025, 5:45:30 pm
 * Author: Jobin Daniel
 * 
 * Copyright (c) 2025 MissioRex Technologies LLP
 */
import React from 'react';

export const metadata = {
  title: 'Courses',
  description: 'List of courses',
};

export default function CoursesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <p className="text-gray-600 mb-4">This is the Courses page. Add your courses listing or related content here.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg">Sample Course 1</div>
        <div className="p-4 border rounded-lg">Sample Course 2</div>
        <div className="p-4 border rounded-lg">Sample Course 3</div>
      </div>
    </main>
  );
}
