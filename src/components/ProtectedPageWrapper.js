"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPageWrapper({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const tokenData = localStorage.getItem("token");

    if (!tokenData) {
      router.push("/login");
      return;
    }

    try {
      const { token, expiry } = JSON.parse(tokenData);

      if (!token || Date.now() > expiry) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      setChecking(false);
    } catch (err) {
      console.error("Invalid token data in localStorage");
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  if (checking) return <div>Loading...</div>;
  return <>{children}</>;
}
