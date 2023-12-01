import type { Metadata } from "next";
import PricingPage from "./PricingPage";

export const metadata: Metadata = {
  title: "Pricing | TTS",
};

export default function Pricing() {
  return <PricingPage />;
}
