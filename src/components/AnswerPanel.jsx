import React from "react";

const AnswerPanel = ({ answer, onAnswerChange, onSkip, onSaveNext }) => {
  return (
    <div className="flex flex-col h-full px-4 py-1">
      {/* Answer Input */}
      <label
        htmlFor="answer"
        className="text-neutral-700 font-medium text-sm mb-2"
      >
        Your Answer
      </label>
      <textarea
        id="answer"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="flex-1 resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      ></textarea>

      {/* Buttons */}
      <div className="mt-2 mb-4 flex justify-between gap-2">
        <button
          onClick={onSkip}
          className="w-1/2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
        >
          Skip
        </button>
        <button
          onClick={onSaveNext}
          className="w-1/2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};


export default AnswerPanel;
