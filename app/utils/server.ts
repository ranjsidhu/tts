import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = cookies();

  // Validate required environment variables
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;
  const dbAnonKey = process.env.NEXT_PUBLIC_DB_API_ANON_KEY;

  if (!dbUrl) {
    throw new Error("NEXT_PUBLIC_DB_URL environment variable is required");
  }
  if (!dbAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_DB_API_ANON_KEY environment variable is required"
    );
  }

  return createServerClient(dbUrl, dbAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.then((cookie) => cookie.getAll());
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.then((cookie) => cookie.set(name, value, options))
        );
      },
    },
  });
}
