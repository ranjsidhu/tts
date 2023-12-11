import type { Metadata } from "next";
import TestimonialsPage from "./TestimonialsPage";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "View testimonials of Tutoring To Success alumni who achieved their academic dreams as a result of our tutors' dedication to their success",
};

export default function Testimonials() {
  return <TestimonialsPage />;
}
