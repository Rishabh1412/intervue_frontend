// app/(auth)/login/page.jsx

export const metadata = {
  title: "Login",
  description: "Access your Intervue dashboard to manage interviews and view summaries.",
  keywords: ["Login", "Intervue", "Interview App Login", "Auth"],
  openGraph: {
    title: "Login | Intervue",
    description: "Securely login to your Intervue account and access all features.",
    url: "https://intervue-frontend-gamma.vercel.app/login",
    siteName: "Intervue",
    type: "website",
  },
};


export default function LoginLayout({ children }) {
  return <>{children}</>;
}