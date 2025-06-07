import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Layout from "@/app/components/layout/Layout";
import { getSession } from "@/lib/session";
import DashboardName from "./DashboardName";
import AuthWrapper from "@/app/components/auth/AuthWrapper";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/auth/sign-in");
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow border border-gray-100">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <DashboardName name={session.user.name || ""} />
        </div>
      </Layout>
    </AuthWrapper>
  );
}
