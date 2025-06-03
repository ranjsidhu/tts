import { Toaster } from "react-hot-toast";
import { LayoutProps } from "@/app/types";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col" data-testid="layout">
      <Navbar />

      <main className="flex-1 mt-28" data-testid="layout-main">
        <div className="container mx-auto px-4" data-testid="layout-children">
          {children} <Toaster position="top-right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
