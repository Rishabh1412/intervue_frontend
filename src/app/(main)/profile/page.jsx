// app/profile/page.jsx
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";
import React from "react";

const ProfilePage = () => {
  // Dummy data (replace with real backend/API or props later)
  const interviewee = {
    name: "Jane Doe",
    targetRole: "Frontend Developer",
    level: "Intermediate",
    interviews: [
      {
        id: 1,
        date: "2025-05-20",
        topic: "JavaScript",
        score: "4/5",
        status: "Completed",
      },
      {
        id: 2,
        date: "2025-05-21",
        topic: "System Design",
        score: "2/5",
        status: "Completed",
      },
    ],
    suggestions: [
      "Practice more on JS async/await",
      "Review system design patterns",
      "Improve answer structure in behavioral rounds",
    ],
  };

  return (
    <ProtectedPageWrapper>
    <div className="bg-white text-black-dark min-h-screen overflow-y-auto">
      <div className="lg:max-w-2xl md:max-w-5xl max-w-full gap-4 flex flex-col mx-auto p-4 pt-18">
        {/* Header */}
        <h1 className="text-2xl font-medium text-n">
          Interviewee Profile
        </h1>

        {/* Basic Info */}
        <div className="border-2 border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
          <h2 className="text-xl font-semibold mb-2">{interviewee.name}</h2>
          <p className="text-sm text-purple-700">
            Target Role: {interviewee.targetRole}
          </p>
          <p className="text-sm text-purple-700">Level: {interviewee.level}</p>
        </div>

        {/* Interview History */}
        <div className="border border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
          <h3 className="text-lg font-semibold mb-3">Interview History</h3>
          <ul className="">
            {interviewee.interviews.map((int) => (
              <li key={int.id} className="px-3 py-2">
                <p className="font-medium">
                  {int.topic} – {int.date}
                </p>
                <p className="text-sm text-purple-700">
                  Score: {int.score} | Status: {int.status}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="border border-purple-500 bg-purple-100 rounded-2xl px-4 lg:px-8 py-3">
          <h3 className="text-lg font-semibold mb-2">Suggestions for You</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {interviewee.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </ProtectedPageWrapper>
  );
};

export default ProfilePage;
