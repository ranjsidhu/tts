"use server";

import { signOut } from "@/auth";
import { prisma } from "@/app/api/utils/prismaUtils";

const signOutAction = async () => {
  await signOut();
};

const getUserDetails = async (email: string | null | undefined) => {
  if (!email) return null;
  const userDetails = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      dob: true,
      phone: true,
      email: true,
      first_line_address: true,
      city: true,
      town: true,
      postcode: true,
      roles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return userDetails;
};

export { signOutAction, getUserDetails };
