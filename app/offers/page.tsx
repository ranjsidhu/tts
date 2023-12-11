import type { Metadata } from "next";
import OffersPage from "./OffersPage";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "View our offers here at Tutoring to Success. This page will be updated regurlarly to display the latest offers",
};

export default function Bookings() {
  return <OffersPage />;
}
