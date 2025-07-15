import { Suspense } from "react";
import InterviewPage from "@/components/InterviewPage";

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading interview page...</div>}>
      <InterviewPage />
    </Suspense>
  );
}