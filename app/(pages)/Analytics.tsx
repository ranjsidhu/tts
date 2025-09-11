"use client";

import Head from "next/head";
import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-RQF2GW9H85`}
      />

      <Script strategy="lazyOnload" id="g-analytics">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-RQF2GW9H85', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
    </>
  );
}
