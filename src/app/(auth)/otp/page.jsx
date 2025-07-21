"use client";
import React, { useState } from "react";
import { useRef } from "react";
import "../auth.css";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // collect OTP digits from inputs
    const otp = inputs.current.map((input) => input.value).join("");
    if (otp.length < 6) {
      alert("Please enter a complete 6-digit OTP.");
      return;
    }
    console.log("OTP Entered:", otp);
    try {
      const email = new URLSearchParams(window.location.search).get("email");
      if (!email) {
        alert("Email not found in URL.");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }), // get `email` from URL or props
        }
      );

      const { token } = await res.json();
      const expiryTime = Date.now() + 60 * 60 * 1000;
      localStorage.setItem(
        "token",
        JSON.stringify({ token, expiry: expiryTime })
      );

      if (res.ok) {
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
        router.push("/user-dashboard");

        // redirect to interview page or wherever needed
      } else {
        setLoading(false);

        toast.error(data.message || "Invalid OTP.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("An error occurred.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // call your API or handle verification here

    inputs.current.forEach((input) => (input.value = ""));
    inputs.current[0].focus();
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^\d?$/.test(value)) return;

    e.target.value = value;

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  return (
    <div className="login-page w-full items-center justify-center flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <form className="form px-0" onSubmit={handleSubmit}>
        <h3 className="w-full text-center font-black text-xl text-[#232323]">
          OTP Verification
        </h3>

        <p className="text-sm text-center text-gray-500 mb-4">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              maxLength="1"
              className="input text-center text-gray-700 bg-off-white w-10 py-3"
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <button
          type="submit"
          className={`button-submit ${loading ? "disabled" : ""}`}
        >
          {loading ? (
            <span className="flex gap-2 items-center justify-center">
              <span>
                <Loader size={16} color="#ffffff" />
              </span>
              Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </button>

        <p className="p mt-4">
          Didn't get the code?{" "}
          <span className="span cursor-pointer">Resend</span>
        </p>
      </form>
    </div>
  );
};

export default page;
