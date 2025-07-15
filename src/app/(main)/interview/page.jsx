import { Suspense } from "react";
import dynamic from "next/dynamic";

const InterviewClient = dynamic(() => import("../../../components/InterviewPage"), {
  ssr: false, // optional: avoid hydration issues
});

export default function InterviewPage() {
  return (
    <Suspense fallback={<div>Loading interview page...</div>}>
      <InterviewClient />
    </Suspense>
  );
}