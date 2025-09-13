import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, CalendarCheck } from "lucide-react";
import instagram from "@/app/assets/ig.png";
import facebook from "@/app/assets/fb.png";
import { links, privacyAndTerms } from "@/app/static";
import { config } from "@/app/utils/config";

const socials = [
  {
    name: "Instagram",
    url: config.socialLinks.instagram[0].url,
    icon: instagram,
  },
  {
    name: "Facebook",
    url: config.socialLinks.facebook[0].url,
    icon: facebook,
  },
];

const ContactUs = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-yellow-400">Contact Us</h3>
    <div className="space-y-3 text-gray-300">
      <p className="flex items-center space-x-3">
        <Phone className="w-5 h-5 text-yellow-400" />
        <a
          href="tel:+441902239339"
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          01902 239 339
        </a>
      </p>
      <p className="flex items-center space-x-3">
        <Mail className="w-5 h-5 text-yellow-400" />
        <a
          href={`mailto:${config.adminEmail}`}
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          {config.adminEmail}
        </a>
      </p>
      <button
        type="button"
        className="flex items-start space-x-3 hover:cursor-pointer hover:text-yellow-400 transition-colors duration-300 text-left"
        onClick={() => window.open("https://maps.app.goo.gl/V71AiLukv3wr3Y2g6")}
      >
        <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
        <span>
          337 Tettenhall Road
          <br />
          Wolverhampton
          <br />
          WV6 0SU
        </span>
      </button>
      <button
        type="button"
        className="flex items-start space-x-3 hover:cursor-pointer hover:text-yellow-400 transition-colors duration-300 text-left"
        onClick={() => window.open("https://maps.app.goo.gl/CwFyLVR9VLMDA1ZEA")}
      >
        <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
        <span>
          62 Codsall Road
          <br />
          Wolverhampton
          <br />
          WV6 9QP
        </span>
      </button>
    </div>
  </div>
);

const QuickLinks = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Key Information</h3>
    <nav className="flex flex-col space-y-2">
      {links.map(({ href, name }) => (
        <Link
          href={href}
          key={name}
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          {name}
        </Link>
      ))}
      {privacyAndTerms.map(({ href, name }) => (
        <Link
          href={href}
          key={name}
          className="hover:text-yellow-400 transition-colors duration-300"
        >
          {name}
        </Link>
      ))}
    </nav>
  </div>
);

const OpeningHours = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Opening Hours</h3>
    <div className="space-y-3 text-gray-300">
      <p className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-yellow-400" />
        <span>Term Time Hours</span>
      </p>
      <div className="ml-8 space-y-1">
        <p>Monday - Friday: 4pm - 8pm</p>
        <p>Weekends: 8am - 2pm</p>
      </div>
      <p className="flex items-center space-x-3 mt-4">
        <CalendarCheck className="w-5 h-5 text-yellow-400" />
        <span>Holiday schedules may vary</span>
      </p>
    </div>
  </div>
);

const CopyrightSocials = () => (
  <div className="border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 text-sm text-center">
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => window.open("https://ranjsidhu.dev")}
          >
            &copy; {new Date().getFullYear()} RS Web Consultancy.
          </button>
          <p>Company Registration Number: 15228068</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          {socials.map(({ name, url, icon }) => (
            <Image
              priority
              src={icon}
              key={name}
              alt={name}
              width={24}
              height={24}
              className="w-6 h-6 hover:cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => window.open(url)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export { ContactUs, QuickLinks, OpeningHours, CopyrightSocials };
