import Nav from "@/components/Nav";
import withAuth from "@/components/withAuth";

export const metadata = {
  title: "My App",
  description: "A modern web application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Nav className="z-20"/>
        <main className="min-h-screen">{withAuth(children)}</main>
      </body>
    </html>
  );
}
