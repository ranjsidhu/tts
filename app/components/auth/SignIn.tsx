import { signIn } from "@/auth";
import type { SignInProps } from "@/app/types";

export default function SignIn({ provider }: SignInProps) {
  const signInText = `Sign in`;

  const handleSignIn = async () => {
    "use server";
    await signIn(provider, { redirectTo: "/" });
  };

  const boilerplate = <button type="submit">{signInText}</button>;

  const providerMap: Record<string, React.ReactNode> = {
    google: boilerplate,
    github: boilerplate,
    apple: boilerplate,
    email: boilerplate,
  };

  return <form action={handleSignIn}>{providerMap[provider]}</form>;
}
