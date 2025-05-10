"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "@/app/components/layout/Layout";
import Link from "next/link";
import PageLoading from "@/app/components/loading/PageLoading";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Failed to logout: " + error.message);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <nav className="border-b border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="text-yellow-400 text-xl font-bold">Dashboard</div>
              <button
                onClick={handleLogout}
                className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-black border border-yellow-400 rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
              Welcome{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              You are logged in as{" "}
              <span className="text-yellow-400">{user?.email}</span>
            </p>
            <div className="space-y-4">
              <Link
                href="/dashboard/change-password"
                className="inline-flex items-center px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Change Password
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
