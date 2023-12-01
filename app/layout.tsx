import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Analytics from "./Analytics";
import PageFooter from "./components/PageFooter";
import styles from "./components/components.module.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutoring To Success",
  description: "Your journey to success starts here",
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
      {/* <footer className={styles.footer}> */}
      {/* <PageFooter /> */}
      {/* </footer> */}
    </html>
  );
}
