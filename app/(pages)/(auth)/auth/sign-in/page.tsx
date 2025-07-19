import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Layout from "@/app/components/layout/Layout";
import CredentialsForm from "./CredentialsForm";
import { handleGoogleSignIn } from "./serveractions";
import { getSession } from "@/app/utils/session";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Tutoring To Success account to access your personalized learning journey.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/auth/sign-in/",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/auth/sign-in/",
    },
  },
};

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-28rem)] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome</h1>
            <p className="text-gray-600">
              Sign in to access your Tutoring To Success account
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <CredentialsForm />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <form action={handleGoogleSignIn}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
