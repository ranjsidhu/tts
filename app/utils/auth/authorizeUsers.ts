"use server";

import { prisma } from "@/app/api/utils/prismaUtils";
import { hashPassword, verifyPassword } from "../auth/password";

interface Credentials {
  email: string;
  password: string;
}

const authorizeUsers = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  const typedCredentials = credentials as Credentials;

  const user = await prisma.users.findUnique({
    where: {
      email: typedCredentials.email,
    },
  });

  // If user doesn't exist, create a new one with hashed password
  if (!user) {
    const hashedPassword = await hashPassword(typedCredentials.password);
    const newUser = await prisma.users.create({
      data: {
        email: typedCredentials.email,
        name: typedCredentials.email.split("@")[0],
        password: hashedPassword,
        role: "STUDENT",
      },
    });

    return {
      id: newUser.id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
  }

  // At this point, we know user exists and has a password
  const isPasswordValid = await verifyPassword(
    typedCredentials.password,
    user.password as string
  );

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export { authorizeUsers };
