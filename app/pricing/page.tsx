import type { Metadata } from "next";
import PricingPage from "./PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore transparent and competitive pricing at Tutoring To Success. Discover the investment in your academic success with our clear and comprehensive pricing structure. View our prices to find the perfect tutoring plan for your educational journey.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/pricing",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/pricing",
    },
  },
};

export default function Pricing() {
  return <PricingPage />;
}
