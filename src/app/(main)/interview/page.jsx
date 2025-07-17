import { Suspense } from "react";
import InterviewPage from "@/components/InterviewPage";
import withAuth from "@/components/withAuth";

const Page = ()=>{
  return (
    <Suspense fallback={<div>Loading interview page...</div>}>
      <InterviewPage />
    </Suspense>
  );
}
export default withAuth(Page);