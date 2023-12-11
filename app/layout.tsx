import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "./Analytics";
import reportWebVitals from "./reportWebVitals";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tutoring To Success",
    template: "%s | TTS",
  },
  description: "Your journey to success starts here",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: "/opengraph-image.png",
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

reportWebVitals();
