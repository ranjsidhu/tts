import type { User, Account } from "next-auth";
import { prisma } from "@/app/api/utils/prismaUtils";

type SignInCallbackParams = {
  user: User;
  account: Account | null | undefined;
};

const signInCallback = async ({ user, account }: SignInCallbackParams) => {
  if (!user.email) {
    console.error("Sign in failed: No email provided");
    return false;
  }

  try {
    console.log("Attempting to sign in user:", {
      email: user.email,
      accountType: account?.type,
    });

    // Upsert user based on email
    const dbUser = await prisma.users.upsert({
      where: { email: user.email },
      update: {
        last_logged_in: new Date().toISOString(),
      },
      create: {
        email: user.email,
        name: user.name ?? "",
        role: "STUDENT",
      },
    });

    console.log("Database operation successful:", { userId: dbUser.id });

    // If user exists with Google auth but trying credentials, prevent login
    if (account?.type === "credentials" && !dbUser.password) {
      console.error(
        "Sign in failed: User exists with Google auth but attempting credentials login"
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in signIn callback:", error);
    return false;
  }
};

export { signInCallback };
