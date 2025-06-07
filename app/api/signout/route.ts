/* eslint-disable import/no-unused-modules */

import { signOut } from "@/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  // Clear the session cookie
  cookieStore.delete("authjs.session-token");
  cookieStore.delete("authjs.callback-url");
  cookieStore.delete("authjs.csrf-token");

  // Sign out from auth
  await signOut();

  return NextResponse.json({ success: true });
}
