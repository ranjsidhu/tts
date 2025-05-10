"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import LoginForm from "../../components/auth/LoginForm";
import PageLoading from "../../components/loading/PageLoading";
export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <PageLoading />; // or a loading spinner if you prefer
  }

  if (isAuthenticated) {
    return null; // This will briefly show while the redirect happens
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-yellow-600 hover:text-yellow-500"
          >
            Register here
          </a>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
