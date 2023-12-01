import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | TTS",
};

export default function Contact() {
  return <ContactPage />;
}
