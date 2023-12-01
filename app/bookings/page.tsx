import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";

export const metadata: Metadata = {
  title: "Bookings | TTS",
};

export default function Bookings() {
  return <BookingsPage />;
}
