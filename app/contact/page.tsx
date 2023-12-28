import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with us effortlessly! Reach out through your preferred method — whether it's a call or email. We're here to assist you on your academic journey. Contact Tutoring To Success today and let's start achieving excellence together.",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/contact",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/contact",
    },
  },
};

export default function Contact() {
  return <ContactPage />;
}
