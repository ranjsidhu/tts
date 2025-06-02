import Layout from "@/app/components/layout/Layout";
import { signIn } from "@/auth";
import Image from "next/image";

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    "use server";
    await signIn("google", { redirectTo: "/" });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-28rem)] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to access your Tutoring To Success account
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                Sign in with Google
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <a
                href="/terms-of-service"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
