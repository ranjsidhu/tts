import type { Metadata } from "next";
import OffersPage from "./OffersPage";

export const metadata: Metadata = {
  title: "Offers | TTS",
};

export default function Bookings() {
  return <OffersPage />;
}
