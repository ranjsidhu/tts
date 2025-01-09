import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "At Tutoring To Success, we bring expert tutoring services to Wolverhampton. Our experienced tutors provide personalised learning, ensuring academic success. Join us for face-to-face or online sessions tailored to your child's needs.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/about/",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/about/",
    },
  },
};

export default function About() {
  return <AboutPage />;
}
