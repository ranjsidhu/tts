import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Analytics from "./Analytics";
import type { NextFont } from "next/dist/compiled/@next/font";
import "./globals.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tutoringtosuccess.co.uk"),
  title: {
    default: "Tutoring To Success",
    template: "%s | Tutoring To Success",
  },
  description: "Your journey to success starts here",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Tutoring To Success",
    description: "Your journey to success starts here",
    images: [{ url: "/opengraph-image.png" }],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
