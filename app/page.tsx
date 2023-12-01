import type { Metadata } from "next";
import Homepage from "./home/Homepage";

export const metadata: Metadata = {
  title: "Home | TTS",
};

export default function Home() {
  return <Homepage />;
}
