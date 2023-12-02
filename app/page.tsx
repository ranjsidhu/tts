import type { Metadata } from "next";
import Homepage from "./home/Homepage";

export const metadata: Metadata = {
  title: "Home | TTS",
  description:
    "Tutoring To Success are dedicated to providing the highest quality educational and academic experience to students at all levels including GCSE, A-Level, KS1/KS2 and 11+. We are based in Wolverhampton and also offer virtual and online sessions through Zoom.",
};

export default function Home() {
  return <Homepage />;
}
