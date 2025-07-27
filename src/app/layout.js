import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Intervue - Interview Smarter",
    template: "%s | Intervue",
  },
  description: "Intervue helps you conduct and analyze technical interviews with ease and speed.",
  metadataBase: new URL("https://intervue-frontend-gamma.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#ECE9E6] h-full`}>
        {children}
      </body>
    </html>
  );
}
