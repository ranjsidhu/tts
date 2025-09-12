"use server";

import { getSession } from "./session";

const getUserId = async () => {
  try {
    const session = await getSession();
    return session?.user?.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserEmail = async () => {
  try {
    const session = await getSession();
    if (!session) return null;
    return session?.user?.email;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getUserId, getUserEmail };
