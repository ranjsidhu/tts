"use client";

import {
  CopyrightSocials,
  ContactUs,
  QuickLinks,
  OpeningHours,
} from "./static";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-black text-white mt-9" data-testid="footer">
      {/* Main footer content */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-testid="footer-content"
      >
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

            <button
              onClick={() => router.push("/#enquiry")}
              data-testid="footer-submit-button"
              type="submit"
              className="w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
            >
              Request Information
            </button>
          </div>
        </div>
      </div>
      <CopyrightSocials />
    </footer>
  );
}
