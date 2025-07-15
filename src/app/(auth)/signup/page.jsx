'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../auth.css';

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.SERVER_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Check your email for OTP.");
      router.push(`/otp?email=${email}`);
    } else {
      alert(data.message || "Signup failed.");
    }
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={handleSignup}>
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

        <button type="submit" className="button-submit">Register</button>

        <p className="p">
          Already have an account? <a href='/login'><span className="span">Sign In</span></a>
        </p>
      </form>
    </div>
  );
};

export default Page;
