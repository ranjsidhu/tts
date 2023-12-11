import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Feel free to contact us using any of the following methods",
};

export default function Contact() {
  return <ContactPage />;
}
