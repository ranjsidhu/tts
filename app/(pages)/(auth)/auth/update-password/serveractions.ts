"use server";

import { prisma } from "@/app/api/utils/prismaUtils";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@/app/utils/auth/password";

const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.password_reset_token.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.password_reset_token.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.password_reset_token.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.password_reset_token.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  return user;
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password?token=${token}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/update-password`,
    {
      method: "POST",
      body: JSON.stringify({ email, resetLink: resetUrl }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send password reset email");
  }
};

const sendResetEmail = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);
};

const setNewPassword = async (password: string, token: string) => {
  if (!token) {
    return { error: "Invalid token" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.users.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.password_reset_token.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated successfully" };
};

export { sendResetEmail, setNewPassword };
