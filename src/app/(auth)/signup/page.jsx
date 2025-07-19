'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../auth.css';
import Loader from '@/components/Loader';

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Check your email for OTP.");
      setLoading(false);
      router.push(`/otp?email=${email}`);
    } else {
      setLoading(false);
      alert(data.message || "Signup failed.");
    }
  };

  return (
    <div className="login-page w-full">
      <form className="form px-0" onSubmit={handleSignup}>
        <h3 className='w-full text-center font-black text-xl text-[#232323]'>Register</h3>

        <div className="flex-column">
          <label>Name</label>
        </div>
        <div className="inputForm">
          {/* Optional: Replace SVG with your icon */}
          <input
            type="text"
            className="input text-gray-700"
            placeholder="Enter your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
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

        <button type="submit" className={`button-submit ${loading ? 'disabled' : ''}`}>
          {loading ? <span className="flex gap-2 items-center justify-center"><span><Loader size={16} color="#ffffff"/></span>Creating Account</span> : "Create Account"}
        </button>

        <p className="p">
          Already have an account? <a href='/login'><span className="span">Sign In</span></a>
        </p>
      </form>
    </div>
  );
};

export default Page;
