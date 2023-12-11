import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about us here at Tutoring to Success, including the background of our DBS-checked tutors",
};

export default function About() {
  return <AboutPage />;
}
