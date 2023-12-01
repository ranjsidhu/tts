import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About | TTS",
};

export default function About() {
  return <AboutPage />;
}
