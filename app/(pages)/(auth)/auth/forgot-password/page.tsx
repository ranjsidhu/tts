import { Suspense } from "react";
import type { Metadata } from "next";
import ForgotPassword from "./ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password?",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  );
}
