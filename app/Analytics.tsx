"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";
import Script from "next/script";

export default function Analytics() {
  const pathname = usePathname();
  const canonicalUrl = `https://tutoringtosuccess.co.uk` + pathname;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
    </>
  );
}
