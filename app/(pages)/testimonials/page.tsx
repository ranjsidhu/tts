import type { Metadata } from "next";
import TestimonialsPage from "./TestimonialsPage";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Explore inspiring testimonials from Tutoring To Success alumni who turned their academic aspirations into reality, thanks to the unwavering dedication of our tutors. Discover success stories that showcase the transformative impact of our personalized approach to education.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/testimonials/",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/testimonials/",
    },
  },
};

export default function Testimonials() {
  return <TestimonialsPage />;
}
