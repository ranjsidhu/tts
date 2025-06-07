"use client";

import { useState } from "react";
import { sendResetEmail } from "../update-password/serveractions";
import PageLoading from "@/app/components/loading/PageLoading";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    try {
      await sendResetEmail(email);
      toast.success("Password reset email sent");
    } catch (error: any) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isLoading && <PageLoading />}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          autoComplete="email"
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
      >
        Reset Password
      </button>
    </form>
  );
}
