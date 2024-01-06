import type { Metadata } from "next";
import OffersPage from "./OffersPage";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Discover exclusive opportunities at Tutoring To Success! Explore our latest promotions and special offers designed to enhance your learning experience. Check back regularly, as this page is updated with exciting new offers to support your academic journey.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/offers/",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/offers/",
    },
  },
};

export default function Bookings() {
  return <OffersPage />;
}
