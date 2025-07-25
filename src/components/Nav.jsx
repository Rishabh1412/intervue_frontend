"use client";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include", // This ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in header
            // Don't include Authorization header for HTTP-only cookies
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      // Optional: Redirect to login or home page
      window.location.href = "/login";
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Logout failed: " + error.message);
    }
  };
  return (
    <div className="w-screen h-16 border-b border-gray-200 bg-white z-10 fixed top-0 left-0 flex items-center justify-between px-4">
      <h3 className="font-semibold text-xl text-black">Intervue.</h3>
      <div className="flex gap-4">
        <button
          className="text-black hover:text-red-500 duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
        <Link href={"/profile"}>
          <div className="h-8 w-8 rounded-full bg-black"></div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
