import React from 'react';

export const metadata = {
  title: 'Institutes',
  description: 'List of institutes',
};

export default function InstitutesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Institutes</h1>
      <p className="text-gray-600 mb-4">This is the Institutes page. Add institute listings or related content here.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg">Sample Institute A</div>
        <div className="p-4 border rounded-lg">Sample Institute B</div>
        <div className="p-4 border rounded-lg">Sample Institute C</div>
      </div>
    </main>
  );
}
