"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../auth.css";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";

// app/(auth)/login/page.jsx

export const metadata = {
  title: "Login",
  description: "Access your Intervue dashboard to manage interviews and view summaries.",
  keywords: ["Login", "Intervue", "Interview App Login", "Auth"],
  openGraph: {
    title: "Login | Intervue",
    description: "Securely login to your Intervue account and access all features.",
    url: "https://intervue-frontend-gamma.vercel.app/login",
    siteName: "Intervue",
    type: "website",
  },
};


const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // State to store form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const { token } = await res.json();
    const expiryTime = Date.now() + 60 * 60 * 1000;
    localStorage.setItem(
      "token",
      JSON.stringify({ token, expiry: expiryTime })
    );
    //local storage token auto delete same as cookie

    Cookies.set("token", token, { expires: 7, secure: true, httpOnly: true });
    if (res.ok) {
      toast.success('Login Succesful', {
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
      // You can also store token in localStorage or use cookies

      router.push("/user-dashboard"); // Redirect after login
    } else {
      setLoading(false);
      
      toast.error(data.message || "Login failed.", {
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
  };

  return (
    <div className="login-page items-center justify-center flex w-full">
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
      <form className="form px-0" onSubmit={handleLogin}>
        <h3 className="w-full text-center font-black text-xl text-[#232323]">
          Login
        </h3>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="M30.853 13.87a15 15 0 0 0-29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0-1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1-4.158-.759v-10.856a1 1 0 0 0-2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zM16 22a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6z" />
            </g>
          </svg>
          <input
            type="email"
            className="input text-gray-700"
            placeholder="Enter your Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48zm-288-288c-8.813 0-16 7.168-16 16v224c0 8.832 7.187 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.187-16-16-16zm0 0" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80c0-70.594 57.406-128 128-128s128 57.406 128 128v80c0 8.832-7.168 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            className="input text-gray-700"
            placeholder="Enter your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`button-submit disabled:bg-gray-700 ${loading ? "disabled" : ""}`}
        >
          {loading ? (
            <span className="flex gap-2 items-center justify-center">
              <span>
                <Loader size={16} color="#ffffff" />
              </span>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p className="p">
          Don't have an account?{" "}
          <a href="/signup">
            <span className="span">Sign Up</span>
          </a>
        </p>
      </form>
    </div>
  );
};

export default Page;
