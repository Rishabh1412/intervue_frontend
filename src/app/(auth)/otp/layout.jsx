// app/(auth)/login/page.jsx

export const metadata = {
  title: "OTP Verification",
  description: "Enter the OTP sent to your email to verify and access your Intervue account.",
  keywords: ["OTP", "Login Verification", "Secure Auth", "Intervue"],
  openGraph: {
    title: "OTP Verification | Intervue",
    description: "Securely verify your identity with OTP to access Intervue.",
    url: "https://intervue-frontend-gamma.vercel.app/otp",
    siteName: "Intervue",
    type: "website",
  },
};


export default function OTPLayout({ children }) {
  return <>{children}</>;
}