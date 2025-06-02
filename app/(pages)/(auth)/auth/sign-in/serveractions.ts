"use server";

import { signIn } from "@/auth";

const handleCredentialsSignIn = async (formData: FormData) => {
  await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    redirectTo: "/dashboard",
  });
};

const handleGoogleSignIn = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export { handleCredentialsSignIn, handleGoogleSignIn };
