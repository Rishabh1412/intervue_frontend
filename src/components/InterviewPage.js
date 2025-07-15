"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TagBlock from "@/components/TagBlock";
import AnswerPanel from "@/components/AnswerPanel";

const Page = () => {
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [showAnimation, setShowAnimation] = useState(true);
  const [greeting, setGreeting] = useState("Hello");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [evaluations, setEvaluations] = useState([]); // stores { question, answer, evaluation }
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const searchParams = useSearchParams();

  const evaluateAnswer = async () => {
    const question = questions[currentIndex];

    // Don’t send empty answers
    if (!currentAnswer.trim()) return null;

    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/api/protected/evaluate-answer`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question?.question,
            userAnswer: currentAnswer,
            role: searchParams.get("role"),
            level: searchParams.get("level"),
            interviewType: searchParams.get("interviewType"),
            language: searchParams.get("language"),
          }),
        }
      );

      if (!res.ok) throw new Error("Evaluation failed");

      const data = await res.json();
      console.log("Evaluation result:", data);
      return data;
    } catch (error) {
      console.error("Error evaluating answer:", error.message);
      return null;
    }
  };

  // Save to user's marked questions
  const saveUserQuestion = async (questionData) => {
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/api/protected/add-user-question`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(questionData),
        }
      );
      return await res.json();
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  // Delete from user's saved questions
  const deleteUserQuestion = async (questionText) => {
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/api/protected/delete-user-question`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: questionText }), // pass only question text
        }
      );
      return await res.json();
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const toggleMarkQuestion = async () => {
    const questionData = questions[currentIndex];

    const isAlreadyMarked = markedQuestions[currentIndex];

    if (!isAlreadyMarked) {
      // Save to user's marked questions
      await saveUserQuestion({
        question: questionData.question,
        topics: questionData.topics,
        level: questionData.difficulty || "easy",
      });
    } else {
      // Delete from user's marked questions
      await deleteUserQuestion(questionData.question);
    }

    setMarkedQuestions((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleAnswerChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleSkip = () => {
    const question = questions[currentIndex];
    setSkippedQuestions((prev) => [...prev, { question: question?.question }]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer("");
    } else {
      setShowSummary(true);
    }
  };

  const handleSaveNext = async () => {
    const question = questions[currentIndex];

    if (!currentAnswer.trim()) {
      handleSkip(); // Treat empty as skipped
      return;
    }

    const evaluation = await evaluateAnswer();

    if (evaluation) {
      setEvaluations((prev) => [
        ...prev,
        {
          question: question?.question,
          answer: currentAnswer,
          evaluation,
        },
      ]);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer("");
    } else {
      setShowSummary(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const role = searchParams.get("role");
    const level = searchParams.get("level");
    const interviewType = searchParams.get("interviewType");
    const language = searchParams.get("language");

    if (!role || !level || !interviewType || !language) {
      setError("Missing required parameters");
      return;
    }

    if (questions.length > 0) return; // ✅ Prevent re-fetch if already loaded

    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${process.env.SERVER_URL}/api/protected/generate-questions`,
          {
            method: "POST",
            credentials: "include", // Send cookie
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role,
              level,
              interviewType,
              language,
              numberOfQuestions: 5,
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();
        setQuestions(data.questions || []);
        if (data.questions.length > 0) {
          data.questions.forEach(async (q) => {
            try {
              await fetch(`${process.env.SERVER_URL}/api/auth/add-question`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  question: q.question,
                  topics: q.topics,
                  level: q.difficulty,
                }),
              });
            } catch (err) {
              console.warn(
                "App question save failed (possibly already exists)"
              );
            }
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Could not load questions");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const name = searchParams.get("name")?.trim();
    if (name && name.toLowerCase() !== "anonymous" && name !== "") {
      setGreeting(`Hello, ${name}`);
    } else {
      setGreeting("Hello, Interviewee 👋");
    }
  }, [searchParams]);

  return (
    <div className="relative bg-white h-full w-full overflow-hidden">
      {/* Entry Animation */}
      <AnimatePresence>
        {showAnimation && (
          <>
            {/* Greeting Message */}
            <motion.div
              key="greeting"
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-purple-600 inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 1, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.25, y: -60 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <div className="flex gap-4 flex-col items-center">
                <h1 className="text-4xl font-bold text-white">{greeting}</h1>
                <button
                  onClick={() => {
                    setShowAnimation(false);
                  }}
                  className="text-lg font-semibold text-black tracking-tight bg-white py-2 px-6 w-fit rounded-4xl"
                >
                  Start
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative flex items-center lg:pt-16 pt-18 justify-center h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center lg:flex-row gap-0">
          <div className="lg:w-2/5 w-full text-xl lg:pl-8 leading-4 lg:px-0 px-4 font-medium text-black-dark py-4 bg-white lg:h-full">
            {/* question pane */}
            <div className="flex justify-between flex-col gap-1 h-1/2">
              <div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      Hi,{" "}
                      <span className="text-purple-700">
                        {searchParams.get("name") || "Interviewee"}!
                      </span>
                      <br />
                      <span className="text-gray-400 text-xs ">
                        Welcome to your interview.
                      </span>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                        fill="none"
                      >
                        <g transform="translate(2.8 2.8) scale(2.8)">
                          <circle
                            cx="45"
                            cy="45"
                            r="45"
                            fill="#ffffff0" // pastel red
                          />
                          <path
                            d="M70.958 46.112c.018-.027.029-.057.046-.084.051-.084.1-.168.138-.259.016-.038.023-.079.037-.118.029-.084.06-.166.077-.255.026-.129.04-.262.04-.395s-.014-.266-.04-.395a2.186 2.186 0 0 0-.077-.255 2.31 2.31 0 0 0-.037-.118 2.26 2.26 0 0 0-.138-.259c-.016-.027-.028-.058-.046-.084a2.029 2.029 0 0 0-.249-.303L60.605 33.482a2 2 0 1 0-2.828 2.828l6.69 6.69H39.863a2 2 0 1 0 0 4h24.604l-6.69 6.69a2 2 0 1 0 2.828 2.828l10.103-10.103c.075-.108.158-.21.23-.319z"
                            fill="#808080"
                          />
                          <path
                            d="M49.887 55.336a2 2 0 0 0-2 2v6.602H26.704V26.062h21.183v6.602a2 2 0 1 0 4 0v-8.602a2 2 0 0 0-2-2H24.704a2 2 0 0 0-2 2v41.875a2 2 0 0 0 2 2h25.183a2 2 0 0 0 2-2v-8.602a2 2 0 0 0-2-2z"
                            fill="#808080"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                  {loading ? (
                    <p className="text-sm text-gray-500 mt-4">
                      Loading question...
                    </p>
                  ) : error ? (
                    <p className="text-sm text-red-500 mt-4">{error}</p>
                  ) : questions.length > 0 ? (
                    <div className="flex flex-col gap-0 overflow-y-hidden">
                      <div className="flex flex-col gap-2 justify-between mt-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-md font-semibold text-[#131313] py-2">
                            Question {currentIndex + 1}:
                          </h4>
                          <div className="flex items-center gap-2">
                            <TagBlock
                              text={
                                questions[currentIndex]?.difficulty || "Easy"
                              }
                              textColor="#ffffff"
                              color={
                                questions[currentIndex]?.difficulty === "Easy"
                                  ? "#00e66b"
                                  : questions[currentIndex]?.difficulty ===
                                    "Medium"
                                  ? "#facc15"
                                  : "#ef4444"
                              }
                            />
                            {!markedQuestions[currentIndex] ? (
                              <button title="Mark this question">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  onClick={toggleMarkQuestion}
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6 text-purple-700 cursor-pointer hover:bg-purple-100 rounded-full p-1"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 text-purple-700 cursor-pointer hover:bg-purple-100 rounded-full p-1"
                                onClick={toggleMarkQuestion}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-0.5">
                          {questions[currentIndex]?.topics?.map((topic, i) => (
                            <TagBlock
                              key={i}
                              text={topic}
                              textColor="#1E3A8A"
                              color="#DBEAFE"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="font-medium text-sm max-h-60 lg:max-h-88 text-neutral-800 pl-2 lg:px-2 pb-3 pt-3 px-1 overflow-y-auto custom-scrollbar">
                        {questions[currentIndex]?.question}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 mt-4">
                      No questions available.
                    </p>
                  )}
                </div>
              </div>
              <div className="border bg-gray-100 rounded text-sm text-neutral-500 border-gray-200 w-full py-1 lg:py-2 px-2 z-20">
                <span className="font-semibold">Topics:</span>{" "}
                {questions[currentIndex]?.topics?.join(" | ") || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-fit items-center justify-center bg-white py-1 px-2 lg:flex-row flex-col gap-0.5">
            <div className="lg:h-6 lg:w-[2px] w-6 h-[2px] rounded-3xl bg-neutral-400"></div>
            <div className="lg:h-6 lg:w-[2px] w-6 h-[2px] rounded-3xl bg-neutral-400"></div>
          </div>
          <div className="lg:w-3/5 w-full bg-off-white h-full min-h-1/2">
            {/* answer typing pane */}
            <AnswerPanel
              answer={currentAnswer}
              onAnswerChange={(val) => setCurrentAnswer(val)}
              onSkip={handleSkip}
              onSaveNext={handleSaveNext}
            />
          </div>
        </div>
      </div>
      {showSummary && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-white overflow-y-auto p-8">
          <h2 className="text-2xl font-bold mb-6">Interview Summary</h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold">Answered Questions:</h3>
            {evaluations.length === 0 ? (
              <p className="text-sm text-gray-500">No answers provided.</p>
            ) : (
              evaluations.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border shadow p-4 mb-4"
                >
                  <p className="font-medium">
                    {i + 1}. {item.question}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Your Answer: {item.answer}
                  </p>
                  <p className="text-sm mt-1 text-green-700">
                    Score: {item.evaluation.score}/10
                  </p>
                  <p className="text-sm text-blue-800">
                    Feedback: {item.evaluation.feedback}
                  </p>
                  <p className="text-sm text-purple-700">
                    Suggestion: {item.evaluation.suggestion}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Skipped Questions:</h3>
            {skippedQuestions.length === 0 ? (
              <p className="text-sm text-gray-500">None</p>
            ) : (
              skippedQuestions.map((q, i) => (
                <p key={i} className="text-sm text-red-600 mb-1">
                  {i + 1}. {q.question}
                </p>
              ))
            )}
          </div>

          <button
            onClick={() => {
              setCurrentIndex(0);
              setCurrentAnswer("");
              setSkippedQuestions([]);
              setEvaluations([]);
              setShowSummary(false);
            }}
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800"
          >
            Retake Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
