import { CheckCircle, BookOpen, Trophy, Users } from "lucide-react";
import type { Testimonial } from "../types";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Testimonials",
    href: "/testimonials",
  },
  {
    name: "Offers",
    href: "/offers",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const features = [
  {
    icon: <Trophy size={32} />,
    title: "Proven Results",
    description: "Consistent success with students achieving top grades",
  },
  {
    icon: <Users size={32} />,
    title: "Small Groups",
    description: "Focused attention with maximum 6 students per class",
  },
  {
    icon: <BookOpen size={32} />,
    title: "Expert Teachers",
    description: "Qualified educators with years of experience",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Personalised Learning",
    description: "Tailored approach to meet individual needs",
  },
];

const testimonials: Testimonial[] = [
  {
    content:
      "Tutoring to Success has given me a strong platform to achieve great things at university as a medical student. The support, reliability and hard work from their tutors is amazing",
    author: "Simran",
    role: "Medical Student",
    subject: "A-Level Sciences",
  },
  {
    content:
      "Thank you so much for helping our daughter achieve her goals of passing her 11+ entrance exams. Your expertise helped her gain the knowledge she needed",
    author: "Parent of Amanda",
    role: "11+ Success",
    subject: "English & Maths",
  },
  {
    content:
      "I would always recommend Tutoring to Success! Reliable, friendly, professional and a great knowledge of the Maths & English curriculum",
    author: "Sienna",
    role: "GCSE Student",
    subject: "Maths & English",
  },
  {
    content:
      "The personalised attention and structured approach helped my son improve his grades significantly. The tutors are patient and really understand how to engage with students.",
    author: "Parent of James",
    role: "Year 8 Parent",
    subject: "Science",
  },
  {
    content:
      "From struggling with equations to achieving an A* in Maths! The teaching methods are excellent and they really focus on building confidence.",
    author: "Mohammed",
    role: "A-Level Student",
    subject: "Mathematics",
  },
  {
    content:
      "Outstanding support for my daughter's GCSE preparation. The mock exams and revision strategies were particularly helpful.",
    author: "Parent of Sarah",
    role: "GCSE Success",
    subject: "All Subjects",
  },
];

export { links, features, testimonials };
