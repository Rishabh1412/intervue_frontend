
import InterviewForm from "@/components/InterviewForm";
import React from "react";


const page = () => {
  return (
    <>
        <div
          className="w-screen h-screen flex items-center justify-center"
          style={{
            "--color": "#a748f5",
            background: `linear-gradient(95deg, var(--color) 25%, transparent 25%) -50px 0,
           linear-gradient(-15deg, var(--color) 25%, transparent 25%) -50px 0,
           linear-gradient(25deg, transparent 75%, var(--color) 75%) -50px 0,
           linear-gradient(-45deg, transparent 75%, var(--color) 75%) -50px 0,
           linear-gradient(-15deg, transparent 75%, var(--color) 75%) -50px 0`,
            backgroundColor: "#b669fd",
            backgroundSize: "40px 40px",
          }}
        >
          <div className="max-w-lg flex flex-col items-center justify-center mx-auto bg-white text-black-dark py-4 rounded-xl px-4 md:px-8">
            <InterviewForm />
          </div>
        </div>
    </>
  );
};

export default page;
