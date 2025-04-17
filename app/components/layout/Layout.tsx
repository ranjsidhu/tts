"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import { Toaster } from "react-hot-toast";
import { LayoutProps } from "@/app/types";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }: Readonly<LayoutProps>) {
  const dispatch = useDispatch();
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <div className="min-h-screen flex flex-col" data-testid="layout">
      {isOverlayVisible && (
        <button
          data-testid="layout-overlay"
          className="fixed inset-0 bg-black/50 z-40"
          onClick={overlayClicked}
        />
      )}

      <Navbar onNavbarOpen={overlayClicked} />

      <main className="flex-1 mt-28" data-testid="layout-main">
        <div className="container mx-auto px-4" data-testid="layout-children">
          {children} <Toaster position="top-right" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
