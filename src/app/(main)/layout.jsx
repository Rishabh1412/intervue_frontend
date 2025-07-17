'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export const metadata = {
  title: "My App",
  description: "A modern web application built with Next.js",
};

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <html lang="en">
      <head />
      <body>
        <Nav className="z-20" />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
