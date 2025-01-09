import { CheckCircle, BookOpen, Trophy, Users } from "lucide-react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  //   {
  //     name: "Bookings",
  //     href: "/bookings",
  //   },
  // {
  //   name: "Pricing",
  //   href: "/pricing",
  // },
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

export { links, features };
