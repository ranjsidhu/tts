"use server";

import { prisma } from "@/app/api/utils/prismaUtils";
import { getSession } from "@/lib/session";

export async function updateUserName(newName: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Not authenticated");

  await prisma.users.update({
    where: { email: session.user.email },
    data: { name: newName },
  });

  return newName;
}

export async function getUserRole(email: string | null | undefined) {
  if (!email) return null;

  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      role: true,
    },
  });

  if (!user) {
    return null;
  }

  return user.role;
}

export async function getUserDetails(email: string | null | undefined) {
  if (!email) return null;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  return user;
}
