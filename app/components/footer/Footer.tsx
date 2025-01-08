"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { socials, links } from "./static";
import { Mail, Phone, MapPin, Clock, CalendarCheck } from "lucide-react";

type Link = {
  name: string;
  href: string;
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle parent enquiry form submission
    setEmail("");
  };

  return (
    <footer className="bg-black text-white mt-9">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <a
                  href="tel:+447309071389"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  +44 7309 071389
                </a>
              </p>
              <p className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <a
                  href={`mailto:admin@tutoringtosuccess.co.uk`}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  admin@tutoringtosuccess.co.uk
                </a>
              </p>
              <p
                className="flex items-start space-x-3 hover:cursor-pointer hover:text-yellow-400 transition-colors duration-300"
                onClick={() =>
                  window.open("https://maps.app.goo.gl/V71AiLukv3wr3Y2g6")
                }
              >
                <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                <span>
                  337 Tettenhall Road
                  <br />
                  Wolverhampton
                  <br />
                  WV6 0SU
                </span>
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Opening Hours</h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Term Time Hours</span>
              </p>
              <div className="ml-8 space-y-1">
                <p>Monday - Friday: 4pm - 8pm</p>
                <p>Saturday: 8am - 2pm</p>
                <p>Sunday: Closed</p>
              </div>
              <p className="flex items-center space-x-3 mt-4">
                <CalendarCheck className="w-5 h-5 text-yellow-400" />
                <span>Holiday schedules may vary</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
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
            </nav>
          </div>

          {/* Parent Enquiry Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Book a Consultation</h3>
            <p className="text-gray-300 text-sm">
              Interested in our tuition services? Leave your email for a free
              consultation.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
              >
                Request Information
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center">
              <p>&copy; {new Date().getFullYear()} RS Web Consultancy.</p>
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
              {/* <a
                href="#"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Policies
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Safeguarding
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
