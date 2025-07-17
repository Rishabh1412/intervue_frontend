// components/ProtectedPageWrapper.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPageWrapper({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <div>Loading...</div>;
  return <>{children}</>;
}
