"use client";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";



const page = () => {
  const [username, setUsername] = useState(null);
  const [lastInterview, setLastInterview] = useState(null);
  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/protected/user`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json(); // parse JSON response
      return data; // should contain { name: ... } or similar
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  }
  useEffect(() => {
    const fetchLastInterview = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/protected/interview-summary`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch summaries");

        const data = await res.json();
        if (data.summaries?.length > 0) {
          setLastInterview(data.summaries[0]); // latest one
        }
      } catch (err) {
        console.error("Error fetching interview summaries:", err);
      }
    };

    fetchLastInterview();
  }, []);
  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user?.name) setUsername(user.name);
    }

    fetchUser(); // call async function inside useEffect
  }, []);

  return (
    <ProtectedPageWrapper>
      <div className="flex flex-col min-h-screen w-screen items-center md:px-10 px-2 py-4 bg-[#F6F4FB]">
        <div className="w-full px-4 py-4 mt-12">
          <h1 className="font-bold text-3xl text-[#232323]">
            <span className="text-purple-500">Hi,</span> {username}
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3 rounded-2xl h-full">
          <div className="w-full gap-2 flex-col flex rounded-xl order-2 md:order-1">
            <div className="bg-transparent h-full p-8 hidden lg:block"></div>
            <div className="bg-white rounded-xl shadow-sm h-full p-8 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold  text-gray-800">
                  Saved Questions
                </h4>
                <Link href="/user-questions">
                  <button className="py-2 px-6 cursor-pointer rounded-full bg-purple-200 mt-2 flex items-center justify-center">
                    <p className="text-xl font-bold text-purple-600">View</p>
                  </button>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Across all roles and levels
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white border relative border-gray-200 shadow-sm py-8 px-8 rounded-xl flex flex-col gap-8 overflow-hidden justify-end items-center order-1 md:order-2">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-50 z-0"></div>
            <Link href={"/interview-user-data"}>
              <button className="bg-purple-600 z-10 gap-1 flex items-center hover:bg-purple-700 transition text-white text-lg font-medium px-6 py-2 rounded-full shadow-md border-4 border-purple-600 hover:border-purple-400 hover:shadow-lg">
                Start
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
            <div className="flex gap-0 z-10 leading-0 flex-col">
              <h4 className="text-7xl tracking-tighter font-semibold text-gray-900">
                Start Interview
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Prepare for your next interview with our
                <br /> AI-powered platform.
              </p>
            </div>
          </div>
          <div className="w-full rounded-xl flex flex-col gap-2 order-3">
            <div className="bg-transparent rounded-xl hidden lg:block h-full p-8"></div>
            <div className="bg-white rounded-xl shadow-sm h-full p-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Previous Interview
              </h4>
              {lastInterview ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {lastInterview.role} – {lastInterview.level}
                    </span>
                    <span className="text-purple-600 font-medium">
                      {lastInterview.interviewType} | {lastInterview.language}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(lastInterview.createdAt).toLocaleString()}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No interviews yet.</p>
              )}
              <Link href="/profile">
                <button className="mt-4 px-4 py-2 rounded-full bg-purple-200 text-purple-700 font-medium hover:bg-purple-300">
                  View All Interviews
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPageWrapper>
  );
};

export default page;
