"use client";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [levels] = useState(["Easy", "Medium", "Hard"]);
  const [topics, setTopics] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch saved questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams();
      if (selectedLevel) query.append("level", selectedLevel);
      if (selectedTopic) query.append("topic", selectedTopic);

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/protected/get-user-questions?${query.toString()}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data.questions || []);
      setFilteredQuestions(data.questions || []);

      // Collect unique topics
      const allTopics = new Set();
      data.questions?.forEach((q) => q.topics.forEach((t) => allTopics.add(t)));
      setTopics(Array.from(allTopics));
    } catch (err) {
      console.error(err);
      setError("Could not load saved questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedLevel, selectedTopic]);

  return (
    <div className="flex flex-col h-screen w-screen items-center pb-4 md:px-10 px-2 bg-[#F6F4FB]">
      <div className="w-full py-4 mt-14 flex justify-between items-center">
        <h1 className="font-medium text-3xl text-black gap-2 flex items-center justify-center tracking-tight">
          <Link href="/user-dashboard">
            <button className=" hover:bg-purple-300 flex active:bg-purple-400 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </Link>
          Saved Questions
        </h1>
        <div className="flex gap-4">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-white border text-black border-purple-500 rounded-full px-3 py-1 text-sm"
          >
            <option value="" className="text-black">
              All Levels
            </option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-white border text-black border-purple-500 px-3 rounded-full py-1 text-sm"
          >
            <option value="" className="text-black">
              All Topics
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white w-full rounded-2xl border-2 border-purple-300 shadow-xl overflow-x-auto">
        {loading ? (
          <div className="p-6 text-gray-500 text-center">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-500 text-center">{error}</div>
        ) : filteredQuestions.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            No saved questions found.
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-purple-200 text-purple-900 font-semibold">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Question</th>
                <th className="p-3">Level</th>
                <th className="p-3">Topics</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredQuestions.map((q, index) => (
                <tr
                  key={q._id}
                  className="border-b hover:bg-purple-50 transition-all"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-[300px] text-black">{q.question}</td>
                  <td
                    className={`p-3 font-semibold ${
                      q.level === "Hard"
                        ? "text-red-600"
                        : q.level === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {q.level}
                  </td>
                  <td className="p-3 max-w-[200px] text-purple-800">
                    {q.topics?.length ? q.topics.join(", ") : "—"}
                  </td>
                  <td className="p-3">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default withAuth(Page);
