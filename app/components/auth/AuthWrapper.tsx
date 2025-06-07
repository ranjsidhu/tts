import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AuthWrapperProps, Role } from "@/app/types";
import { getUserRole } from "@/app/(pages)/dashboard/serveractions";

export default async function AuthWrapper({
  children,
  role,
}: AuthWrapperProps) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const userRole = await getUserRole(session.user.email);

  if (!userRole) {
    redirect("/");
  }

  if (role && !role.includes(userRole as Role)) {
    redirect("/");
  }

  return <>{children}</>;
}
