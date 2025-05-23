/* eslint-disable import/no-unused-modules */
import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
import Analytics from "./Analytics";
import StoreProvider from "./StoreProvider";
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
      <StoreProvider>
        <body className={inter.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
