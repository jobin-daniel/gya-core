"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  // Initialize AOS only on client
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({ duration: 1000 });
    });
  }, []);

  return (
    <main>


      {/* Hero / Banner */}
      <section className="min-h-[60vh] bg-linear-to-r from-blue-50 to-indigo-50 pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
     

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 max-w-3xl mx-auto" data-aos="fade-up">
              Find the career you&apos;re looking for in your future.
            </h1>

            <div className="max-w-2xl mx-auto flex rounded-full overflow-hidden shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <input
                type="text"
                placeholder="Search Institute, Courses"
                className="flex-1 px-6 py-4 border-2 border-r-0 border-gray-200 focus:outline-none"
                aria-label="Search"
              />
              <button className="px-6 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700">Search Details</button>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
