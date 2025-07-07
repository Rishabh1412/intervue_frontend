import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center md:px-10 px-2 py-4 bg-[#F6F4FB]">
      <div className="w-full px-4 py-4 mt-12">
        <h1 className="font-bold text-3xl text-[#232323]">
          <span className="text-purple-500">Hi,</span> Rishabh
        </h1>
      </div>
      <div className="flex w-full gap-3 rounded-2xl h-full">
        <div className="w-full gap-2 flex-col flex rounded-xl">
          <div className="bg-white rounded-xl shadow-sm h-full p-8 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Total Interviews
              </h4>
              <p className="text-4xl font-bold text-purple-600 mt-2">128</p>
              <p className="text-sm text-gray-500 mt-1">
                Across all roles and levels
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-purple-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 6v6l4 2"
              />
            </svg>
          </div>
          <div className="bg-white rounded-xl shadow-sm h-full p-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Upcoming Interviews
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm text-gray-600">
                <span>Frontend Developer – John Doe</span>
                <span className="text-purple-600 font-medium">
                  Today, 3:30 PM
                </span>
              </li>
              <li className="flex justify-between text-sm text-gray-600">
                <span>Data Analyst – Priya Singh</span>
                <span className="text-purple-600 font-medium">
                  Tomorrow, 11:00 AM
                </span>
              </li>
              <li className="flex justify-between text-sm text-gray-600">
                <span>Product Manager – Ahmed Khan</span>
                <span className="text-purple-600 font-medium">
                  Mon, 2:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full bg-white border relative border-gray-200 shadow-sm py-8 px-8 rounded-xl flex flex-col gap-8 overflow-hidden justify-end items-center">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-50 z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-50 z-0"></div>
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
        <div className="w-full rounded-xl flex flex-col gap-2">
          <div className="bg-white rounded-xl shadow-sm h-full p-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Evaluations
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm text-gray-600">
                <span>Ravi Patel – Backend Developer</span>
                <span className="text-green-600 font-medium">Passed</span>
              </li>
              <li className="flex justify-between text-sm text-gray-600">
                <span>Anjali Mehta – UI/UX Designer</span>
                <span className="text-yellow-500 font-medium">
                  Under Review
                </span>
              </li>
              <li className="flex justify-between text-sm text-gray-600">
                <span>David Lee – DevOps</span>
                <span className="text-red-500 font-medium">Rejected</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm h-full p-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Top Candidates
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Sarah J.", score: "92%" },
                { name: "Mohit R.", score: "89%" },
                { name: "Emily K.", score: "88%" },
                { name: "Ankur S.", score: "85%" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-3 rounded-lg bg-purple-50 text-purple-800 text-sm flex justify-between font-medium"
                >
                  <span>{c.name}</span>
                  <span>{c.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
