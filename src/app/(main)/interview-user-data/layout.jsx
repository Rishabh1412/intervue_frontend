// app/(main)/interview-user/page.jsx

export const metadata = {
  title: "Interview Form",
  description: "Create and give interviews with ease using Intervue's intuitive form.",
  keywords: ["Interview Form", "Intervue", "Online Interview", "Tech Interview", "Frontend Interview"],
  openGraph: {
    title: "Interview Form | Intervue",
    description: "Create and give interviews with ease using Intervue's intuitive form.",
    url: "https://intervue-frontend-gamma.vercel.app/interview-user-data",
    siteName: "Intervue",
    type: "website",
  },
};

export default function InterviewUserDataLayout({ children }) {
  return <>{children}</>;
}