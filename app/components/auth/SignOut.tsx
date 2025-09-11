"use client";

import { useRouter } from "next/navigation";
import { signOutAction } from "./serveractions";

export default function SignOut() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOutAction();
        router.push("/");
      }}
      className="text-[#DAA520] text-[14px] hover:underline transition-colors duration-150 flex items-center whitespace-nowrap"
      style={{ lineHeight: 1 }}
    >
      Sign Out
    </button>
  );
}
