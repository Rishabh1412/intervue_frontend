import { Suspense } from "react";
import InterviewPage from "@/components/InterviewPage";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";

export const metadata = {
  title: "Conduct Interviews",
  description: "Start technical interviews easily using Intervue. Conduct, track, and analyze interviews with real-time collaboration.",
  keywords: ["Intervue", "Online Interviews", "Tech Interview", "Live Coding", "Frontend Interview"],
  openGraph: {
    title: "Conduct Interviews | Intervue",
    description: "Start technical interviews easily using Intervue. Real-time features, coding questions, and analysis.",
    url: "https://intervue-frontend-gamma.vercel.app/interview",
    siteName: "Intervue",
    type: "website",
  },
};
export default function Page() {
  return (
    <ProtectedPageWrapper>
      <Suspense fallback={<div>Loading interview page...</div>}>
        <InterviewPage />
      </Suspense>
    </ProtectedPageWrapper>
  );
}
