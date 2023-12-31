"use client";

import { useState } from "react";
import Header from "../header/Header";
import LayoutMain from "./LayoutMain";
import PageFooter from "../footer/PageFooter/PageFooter";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

  const setOverlayVisibility = (setIsMobileMenuOpen: Function = () => {}) => {
    setOverlayVisible(!overlayVisible);
    setIsMobileMenuOpen(!overlayVisible);
  };

  return (
    <div className="container">
      <div
        className={`${overlayVisible ? "overlay" : ""}`}
        // onClick={() => setOverlayVisibility()}
      ></div>
      <LayoutMain>
        <Header setOverlayVisibility={setOverlayVisibility} />
        <div>{children}</div>
      </LayoutMain>
      <PageFooter />
    </div>
  );
}
