import type { User, Account } from "next-auth";
import { prisma } from "@/app/api/utils/prisma-utils";

type SignInCallbackParams = {
  user: User;
  account: Account | null | undefined;
};

export async function signInCallback({ user }: SignInCallbackParams) {
  try {
    if (!user?.email) {
      console.error("No email provided");
      return false;
    }

    // Check if user exists
    const dbUser = await prisma.users.findUnique({
      where: { email: user.email },
      include: {
        roles: true,
      },
    });

    if (dbUser) {
      const role = dbUser.roles?.name;
      console.log("Existing user found:", {
        id: dbUser.id,
        email: dbUser.email,
        role,
      });
      return true;
    }

    // Create new user with default role (Candidate)
    const newUser = await prisma.users.create({
      data: {
        email: user.email,
        first_name: user.name?.split(" ")[0] ?? "",
        last_name: user.name?.split(" ")[1] ?? "",
        roles: {
          connect: {
            id: 3, // Candidate role ID
          },
        },
      },
      include: {
        roles: true,
      },
    });

    const role = newUser.roles?.name;
    console.log("New user created:", {
      id: newUser.id,
      email: newUser.email,
      role,
    });

    return true;
  } catch (error) {
    console.error("Error in signInCallback:", error);
    return false;
  }
}
