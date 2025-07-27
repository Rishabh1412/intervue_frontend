export const metadata = {
  title: "Saved Questions | Intervue",
  description: "Access your saved technical interview questions on Intervue. Organize and revisit questions anytime.",
  keywords: ["Saved Questions", "Intervue", "Coding Questions", "Technical Interviews", "Interview Preparation"],
  openGraph: {
    title: "Saved Questions | Intervue",
    description: "Easily view and manage your saved coding interview questions.",
    url: "https://intervue-frontend-gamma.vercel.app/user-questions",
    siteName: "Intervue",
    type: "website",
  },
};

export default function UserQuestionLayout({ children }) {
  return <>{children}</>;
}