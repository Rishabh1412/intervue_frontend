// app/(main)/profile/page.jsx

export const metadata = {
  title: "Your Profile",
  description: "View and manage your personal profile on Intervue. Update account details and settings.",
  keywords: ["Profile", "User Profile", "Intervue Account"],
  openGraph: {
    title: "Your Profile | Intervue",
    description: "Manage your Intervue account profile and personal settings.",
    url: "https://intervue-frontend-gamma.vercel.app/profile",
    siteName: "Intervue",
    type: "website",
  },
};

export default function ProfileLayout({ children }) {
  return <>{children}</>;
}