import { Suspense } from "react";
import { ResetPasswordForm } from "./_components";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
