"use server";
import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function updateUserName(newName: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated");

  await prisma.user.update({
    where: { email: session.user.email },
    data: { name: newName },
  });

  return newName;
}
