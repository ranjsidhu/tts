import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";

export const metadata: Metadata = {
  title: "Bookings",
  description:
    "Make a booking at your preferred academic level, whether that be A-Level, GCSE or 11+, for your preferred subject, including Maths, English and Science. (Both Combind Science and Triple Science are available).",
};

export default function Bookings() {
  return <BookingsPage />;
}
