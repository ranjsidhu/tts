import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Layout from "@/app/components/layout/Layout";
import { getSession } from "@/app/utils/session";
import AuthWrapper from "@/app/components/auth/AuthWrapper";
import { getUserDetails, getUserRole } from "./serveractions";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/profile",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/profile",
    },
  },
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/auth/sign-in");
  }

  const email = session.user.email ?? null;
  const [user, role] = await Promise.all([
    getUserDetails(email),
    getUserRole(email),
  ]);

  const firstName = user?.first_name ?? session.user.name ?? "User";
  const lastLogin = user?.last_logged_in
    ? new Date(user.last_logged_in).toLocaleString("en-GB")
    : "—";
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-GB")
    : "—";

  return (
    <AuthWrapper>
      <Layout>
        {/* Header */}
        <section className="mt-8">
          <div className="relative overflow-hidden rounded-2xl bg-black text-white">
            <div className="px-6 py-10 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-300">Welcome back</p>
                  <h1 className="text-3xl md:text-4xl font-bold mt-1">
                    {firstName}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-black">
                    {role ?? "Member"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* At-a-glance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="rounded-xl bg-white shadow border border-gray-100 p-6">
              <p className="text-sm text-gray-500">Last login</p>
              <p className="text-lg font-semibold mt-1">{lastLogin}</p>
            </div>
            <div className="rounded-xl bg-white shadow border border-gray-100 p-6">
              <p className="text-sm text-gray-500">Member since</p>
              <p className="text-lg font-semibold mt-1">{memberSince}</p>
            </div>
          </div>

          {/* Profile details */}
          <div className="lg:col-span-2 rounded-2xl bg-white shadow border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your details</h2>
              <span className="text-xs text-gray-500">Email is your login</span>
            </div>
            <div className="p-6">
              <ProfileForm user={user} />
            </div>
          </div>
        </section>
      </Layout>
    </AuthWrapper>
  );
}
