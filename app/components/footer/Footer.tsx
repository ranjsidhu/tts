"use client";

import { useState } from "react";
import {
  CopyrightSocials,
  ContactUs,
  QuickLinks,
  OpeningHours,
} from "./static";

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
          <ContactUs />
          <OpeningHours />
          <QuickLinks />

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
      <CopyrightSocials />
    </footer>
  );
}
