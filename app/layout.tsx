import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "./Analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tutoringtosuccess.co.uk"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
