import type { Metadata } from "next";
import VacanciesPage from "./VacanciesPage";

export const metadata: Metadata = {
  title: "Vacancies",
  description:
    "Explore exciting opportunities to join the Tutoring To Success team! Check out our current vacancies on this page and take the first step toward a rewarding career in education. We're looking for passionate individuals to contribute to our mission of academic excellence. Apply now by filling out the form below, including the option to upload your CV. Your journey to a fulfilling career starts here!",
  alternates: {
    canonical: "https://tutoringtosuccess.co.uk/vacancies/",
    types: {
      www: "https://www.tutoringtosuccess.co.uk/vacancies/",
    },
  },
};

export default function Vacancies() {
  return <VacanciesPage />;
}
