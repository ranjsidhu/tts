import type { Metadata } from "next";
import PricingPage from "./PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description: "View our prices at Tutoring To Success",
};

export default function Pricing() {
  return <PricingPage />;
}
