"use server";

import { prisma } from "@/app/api/utils/prismaUtils";
import { hashPassword, verifyPassword } from "@/app/utils/password";

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
    include: {
      roles: true,
    },
  });

  // If user doesn't exist, create a new one with hashed password
  if (!user) {
    const hashedPassword = await hashPassword(typedCredentials.password);
    const newUser = await prisma.users.create({
      data: {
        email: typedCredentials.email,
        first_name: typedCredentials.email.split("@")[0],
        password: hashedPassword,
        role_id: 3,
      },
      include: {
        roles: true,
      },
    });

    return {
      id: newUser.id.toString(),
      email: newUser.email,
      name: `${newUser.first_name} ${newUser.last_name}`,
      role: newUser.roles?.name ?? "user",
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
    name: `${user.first_name} ${user.last_name}`,
    role: user.roles?.name ?? "user",
  };
};

export { authorizeUsers };
