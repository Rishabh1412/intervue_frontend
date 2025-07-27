// app/(main)/user-dashboard/page.jsx

export const metadata = {
  title: "Dashboard",
  description: "Access your Intervue dashboard. Manage interviews, view summaries, and track performance.",
  keywords: ["Dashboard", "User Panel", "Interview Insights", "Intervue"],
  openGraph: {
    title: "Dashboard | Intervue",
    description: "Your personal Intervue dashboard to manage and review interviews.",
    url: "https://intervue-frontend-gamma.vercel.app/user-dashboard",
    siteName: "Intervue",
    type: "website",
  },
};

export default function DashboardLayout({ children }) {
  return <>{children}</>;
}