/* eslint-disable import/no-unused-modules */

"use server";

import { prisma } from "@/app/api/utils/prismaUtils";
import { getSession } from "@/app/utils/session";
import { revalidatePath } from "next/cache";

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

export async function updateUserProfile(formData: FormData) {
  const session = await getSession();
  if (!session?.user?.email) throw new Error("Not authenticated");

  const first_name = (formData.get("first_name") as string | null) ?? undefined;
  const last_name = (formData.get("last_name") as string | null) ?? undefined;
  const phone = (formData.get("phone") as string | null) ?? undefined;
  const first_line_address =
    (formData.get("first_line_address") as string | null) ?? undefined;
  const town = (formData.get("town") as string | null) ?? undefined;
  const city = (formData.get("city") as string | null) ?? undefined;
  const postcode = (formData.get("postcode") as string | null) ?? undefined;

  await prisma.users.update({
    where: { email: session.user.email },
    data: {
      first_name,
      last_name,
      phone,
      first_line_address,
      town,
      city,
      postcode,
    },
  });

  revalidatePath("/profile");
}
