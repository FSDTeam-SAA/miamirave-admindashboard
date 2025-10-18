"use client";
import "./globals.css";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#34813C] text-white text-center px-6">
      <h1 className="text-9xl font-extrabold text-white drop-shadow-lg">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="mt-2 text-lg text-gray-100 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block bg-[#F0217A] hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
      >
        Go Home
      </Link>

      <div className="absolute bottom-10 text-sm text-gray-200">
        © {new Date().getFullYear()} Your Website
      </div>
    </div>
  );
}
