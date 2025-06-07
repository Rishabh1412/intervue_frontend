import Image from "next/image";

export const metadata = {
  title: "My App",
  description: "A modern web application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="min-h-screen lg:items-center items-start justify-center flex w-full bg-white pt-16 lg:pt-0 lg:bg-white">
          <div className="w-1/2 overflow-hidden hidden lg:block">
            <Image
              src="/img.jpg"
              alt="Auth Image"
              width={800}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
