"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import Header from "../header/Header";
import LayoutMain from "./LayoutMain";
import PageFooter from "../footer/PageFooter/PageFooter";
import "./layout.css";
import { RootState } from "@/lib/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <div className="container">
      <div
        className={`${isOverlayVisible ? "overlay" : ""}`}
        onClick={overlayClicked}
      ></div>
      <LayoutMain>
        <Header setOverlayVisibility={overlayClicked} />
        <div>{children}</div>
      </LayoutMain>
      <PageFooter />
    </div>
  );
}
