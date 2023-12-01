import type { Metadata } from "next";
import TestimonialsPage from "./TestimonialsPage";

export const metadata: Metadata = {
  title: "Testimonials | TTS",
};

export default function Testimonials() {
  return <TestimonialsPage />;
}
