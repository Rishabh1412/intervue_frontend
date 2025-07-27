// app/(auth)/login/page.jsx

export const metadata = {
  title: "Sign Up",
  description: "Create your free Intervue account to start conducting tech interviews in minutes.",
  keywords: ["Sign Up", "Register", "Create Account", "Interview Platform"],
  openGraph: {
    title: "Sign Up | Intervue",
    description: "Join Intervue and start hosting technical interviews with ease.",
    url: "https://intervue-frontend-gamma.vercel.app/signup",
    siteName: "Intervue",
    type: "website",
  },
};


export default function SignupLayout({ children }) {
  return <>{children}</>;
}