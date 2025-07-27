"use client";

import React, { useEffect, useState } from "react";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";



const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const [userRes, summaryRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/protected/user`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/protected/interview-summary`, {
          credentials: "include",
        }),
      ]);

      if (!userRes.ok || !summaryRes.ok) throw new Error("Failed to fetch");

      const userData = await userRes.json();
      const summaryData = await summaryRes.json();

      setUserInfo({
        name: userData.name || "Anonymous",
        targetRole: userData.role || "N/A",
        level: userData.level || "N/A",
      });

      setInterviews(summaryData.summaries || []);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const extractSuggestions = () => {
    const suggestions = new Set();
    interviews.forEach((int) =>
      int.evaluations?.forEach((e) => {
        if (e.suggestion) suggestions.add(e.suggestion);
      })
    );
    return Array.from(suggestions);
  };

  if (loading) {
    return <div className="p-8 h-screen w-screen items-center justify-center fixed flex bg-white text-gray-900">Loading...</div>;
  }

  return (
    <ProtectedPageWrapper>
      <div className="bg-white text-black-dark min-h-screen overflow-y-auto">
        <div className="lg:max-w-2xl md:max-w-5xl max-w-full gap-4 flex flex-col mx-auto p-4 pt-18">
          <h1 className="text-2xl font-medium text-n">Interviewee Profile</h1>

          {/* Basic Info */}
          <div className="border-2 border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
            <h2 className="text-xl font-semibold mb-2">{userInfo.name}</h2>
            <p className="text-sm text-purple-700">
              Target Role: {userInfo.targetRole}
            </p>
            <p className="text-sm text-purple-700">Level: {userInfo.level}</p>
          </div>

          {/* Interview History */}
          <div className="border border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
            <h3 className="text-lg font-semibold mb-3">Interview History</h3>
            {interviews.length === 0 ? (
              <p className="text-sm text-gray-600">No interviews yet.</p>
            ) : (
              <ul>
                {interviews.map((int, idx) => (
                  <li key={int._id} className="px-3 py-2">
                    <p className="font-medium">
                      {int.language} – {new Date(int.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-purple-700">
                      Topic: {int.interviewType} | Score: {int.overallScore}/10
                    </p>
                    <p className="text-md text-purple-700">
                      Role: {int.role} | Level: {int.level}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Suggestions */}
          <div className="border border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
            <h3 className="text-lg font-semibold mb-2">Suggestions for You</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {extractSuggestions().length === 0 ? (
                <p className="text-gray-500">No suggestions available yet.</p>
              ) : (
                extractSuggestions().map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </ProtectedPageWrapper>
  );
};

export default ProfilePage;
