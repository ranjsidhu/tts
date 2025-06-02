import { signIn } from "@/auth";
import { SignInProps } from "@/app/types";
import { capitalise } from "@/app/utils/capitalise";

export default function SignIn({ provider }: SignInProps) {
  const signInText = `Sign in with ${capitalise(provider)}`;

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
