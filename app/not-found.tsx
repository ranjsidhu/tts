import type { Metadata } from "next";
import Head from "next/head";
import NotFound from "./not-found/NotFound";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <NotFound />
    </>
  );
}
