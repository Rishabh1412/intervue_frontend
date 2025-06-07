"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TagBlock from "@/components/TagBlock";
import AnswerPanel from "@/components/AnswerPanel";


const Page = () => {
  const [marked, setMarked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [greeting, setGreeting] = useState("Hello");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const searchParams = useSearchParams();

  const handleAnswerChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleSkip = () => {
    console.log("Skipped question");
    setCurrentAnswer("");
    // lear input // go to next question
  };

  const handleSaveNext = () => {
    // save the answer somewhere
    console.log("Saved answer:", currentAnswer);

    setCurrentAnswer(""); // clear input
  };

  useEffect(() => {
    const name = searchParams.get("name")?.trim();
    if (name && name.toLowerCase() !== "anonymous" && name !== "") {
      setGreeting(`Hello, ${name}`);
    } else {
      setGreeting("Hello, Interviewee 👋");
    }

    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2800); // ✨ increased to wait for text exit + gate animation

    return () => clearTimeout(timer);
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
              className="absolute inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.25, y: -60, rotate: -3 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <h1 className="text-4xl font-bold text-white">{greeting}</h1>
            </motion.div>

            {/* Gate Animation - starts after greeting exits */}
            <motion.div
              key="top"
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-purple-600 z-50"
              initial={{ height: "100%" }}
              animate={{ height: 0 }}
              exit={{ height: 0 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 1.4, // 👈 0.2 (greeting delay) + 0.6 (greeting duration) + 0.6 buffer
              }}
            />
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
                  <div className="flex flex-col gap-0 overflow-y-hidden">
                    <div className="flex items-center justify-between mt-2">
                      <h4 className="text-xl font-bold text-[#131313] py-2">
                        Question:-
                      </h4>
                      <div className="flex items-center justify-center gap-0.5">
                        <TagBlock
                          text="React"
                          textColor="#0C4A6E"
                          color="#DBEAFE"
                        />
                        <TagBlock
                          text="CSS"
                          textColor="#4B5563"
                          color="#E5E7EB"
                        />
                        <TagBlock
                          text="Next.js"
                          textColor="#1E3A8A"
                          color="#DBEAFE"
                        />
                        <TagBlock
                          text="API"
                          textColor="#1E293B"
                          color="#E2E8F0"
                        />
                        <TagBlock
                          text="Easy"
                          textColor="#ffffff"
                          color="#00e66b"
                        />
                        {!marked ? (
                          <button title="Mark this question">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              onClick={() => setMarked(!marked)}
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
                            onClick={() => {
                              setMarked(!marked);
                            }}
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
                    <p className="font-medium text-sm max-h-60 lg:max-h-88 text-neutral-800 pl-2 lg:px-2 pb-3 px-1 overflow-y-auto custom-scrollbar">
                      Explain the difference between client-side rendering (CSR)
                      and server-side rendering (SSR) in web development. What
                      are the pros and cons of each approach, and when would you
                      prefer one over the other? 
                    </p>
                  </div>
                </div>
              </div>
              <div className="border bg-gray-100 rounded text-sm text-neutral-500 border-gray-200 w-full py-1 lg:py-2 px-2 z-20">
                <span className="font-semibold">Topics:</span>{" "}
                {"React | CSS | Next.js | API"}
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
    </div>
  );
};

export default Page;
