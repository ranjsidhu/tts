import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import { hashPassword, verifyPassword } from "@/app/utils/password";

const prisma = new PrismaClient();

interface Credentials {
  email: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const typedCredentials = credentials as Credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: typedCredentials.email,
          },
        });

        // If user exists but has no password (Google sign-in), prevent credentials login
        if (user && !user.password) {
          throw new Error(
            "This account was created with Google. Please sign in with Google."
          );
        }

        // If user doesn't exist, create a new one with hashed password
        if (!user) {
          const hashedPassword = await hashPassword(typedCredentials.password);
          const newUser = await prisma.user.create({
            data: {
              email: typedCredentials.email,
              name: typedCredentials.email.split("@")[0], // Default name from email
              password: hashedPassword,
              role: "STUDENT",
            },
          });

          return {
            id: newUser.id,
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
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    // signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Upsert user based on email
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? undefined,
          },
          create: {
            email: user.email,
            name: user.name ?? "",
            role: "STUDENT",
          },
        });

        // If user exists with Google auth but trying credentials, prevent login
        if (account?.type === "credentials" && !dbUser.password) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
