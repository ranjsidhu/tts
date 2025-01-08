"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <>
      <div
        className={`${isOverlayVisible ? "overlay" : "hidden"}`}
        onClick={overlayClicked}
      ></div>
      <Header setOverlayVisibility={overlayClicked} />
      <div>{children}</div>
      <Footer />
    </>
  );
}
