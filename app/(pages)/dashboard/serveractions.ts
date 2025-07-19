/* eslint-disable import/no-unused-modules */

"use server";

import { prisma } from "@/app/api/utils/prisma-utils";
import { getSession } from "@/app/utils/session";

export async function updateUserName(newName: string) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Not authenticated");

  await prisma.users.update({
    where: { email: session.user.email },
    data: { first_name: newName },
  });

  return newName;
}

export async function getUserRole(email: string | null | undefined) {
  if (!email) return null;

  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      roles: true,
    },
  });

  if (!user) {
    return null;
  }

  return user.roles.name;
}

export async function getUserDetails(email: string | null | undefined) {
  if (!email) return null;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  return user;
}
