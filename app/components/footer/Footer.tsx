"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";
import instance from "@/app/utils/instance";
import {
  CopyrightSocials,
  ContactUs,
  QuickLinks,
  OpeningHours,
} from "./static";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous error
    setEmailError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      toast.error("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      toast.error("Invalid email format");
      return;
    }

    try {
      // Simulate successful submission
      await instance.post("/enquiry/consultation", { email });
      toast.success("Thank you for your enquiry. We will be in touch shortly.");

      // Clear form and show success
      setEmail("");
      toast.success("We'll be in touch soon!", {
        icon: "✉️",
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to submit. Please try again.");
    }
  };

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
            <form
              onSubmit={handleSubmit}
              className="space-y-2"
              data-testid="footer-enquiry-form"
            >
              <div className="relative">
                <input
                  data-testid="footer-email-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Your email address"
                  className={`w-full px-4 py-2 pr-10 bg-gray-900 border rounded-lg focus:outline-none transition-colors duration-300 ${
                    emailError
                      ? "border-red-500 text-red-400"
                      : "border-gray-800 focus:border-yellow-400"
                  }`}
                  required
                />
                {emailError && (
                  <AlertCircle
                    data-testid="footer-email-error-icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                    size={20}
                  />
                )}
              </div>

              {emailError && (
                <p className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle
                    data-testid="footer-email-error-icon"
                    size={16}
                  />
                  {emailError}
                </p>
              )}

              <button
                data-testid="footer-submit-button"
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
