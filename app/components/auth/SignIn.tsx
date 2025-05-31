import { signIn } from "@/auth";
import { SignInProps } from "@/app/types";
import { capitalise } from "@/app/utils/capitalise";

export default function SignIn({ provider }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, { redirectTo: "/" });
      }}
    >
      <button type="submit">Sign in with {capitalise(provider)}</button>
    </form>
  );
}
