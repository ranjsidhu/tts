import type { Metadata } from "next";
import BookingsPage from "./BookingsPage";

export const metadata: Metadata = {
  title: "Bookings",
  description:
    "Secure your tutoring sessions tailored to your academic needs at Tutoring To Success. Choose from A-Level, GCSE, or 11+, and select subjects like Maths, English, and Science—offering both Combined Science and Triple Science. Book now for personalized academic support and excellence.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/bookings",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/bookings",
    },
  },
};

export default function Bookings() {
  return <BookingsPage />;
}
