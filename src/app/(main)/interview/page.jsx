import { Suspense } from "react";
import InterviewPage from "@/components/InterviewPage";
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper";

export default function Page() {
  return (
    <ProtectedPageWrapper>
      <Suspense fallback={<div>Loading interview page...</div>}>
        <InterviewPage />
      </Suspense>
    </ProtectedPageWrapper>
  );
}
