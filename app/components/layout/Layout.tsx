"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import { Toaster } from "react-hot-toast";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<LayoutProps>) {
  const dispatch = useDispatch();
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isOverlayVisible && (
        <button
          className="fixed inset-0 bg-black/50 z-40"
          onClick={overlayClicked}
        />
      )}

      <Navbar onNavbarOpen={overlayClicked} />

      <main className="flex-1 mt-28">
        <div className="container mx-auto px-4">
          {children} <Toaster position="top-right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
