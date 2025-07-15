import { Suspense } from "react";
import InterviewPage from "@/components/InterviewPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading interview page...</div>}>
      <InterviewPage />
    </Suspense>
  );
}