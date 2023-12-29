import type { Metadata } from "next";
import Homepage from "./home/Homepage";

export const metadata: Metadata = {
  title: "Home | Tutoring To Success",
  description:
    "Elevate your child's education with Tutoring To Success in Wolverhampton, Willenhall, Wednesfield,  Tettenhall, Newbridge and the surrounding areas. Dedicated to providing top-quality educational experiences for GCSE, A-Level, KS1/KS2, and 11+. Join us for expert tutoring, personalized learning, and proven results—whether in-person or virtually through Zoom.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk",
    types: {
      www: "https://www.tutoringtosuccess.co.uk",
    },
  },
};

export default function Home() {
  return <Homepage />;
}
