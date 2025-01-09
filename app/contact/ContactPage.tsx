"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Layout from "../components/layout/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with us today. We&apos;re here to help your child
            succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-lg">
                    <Phone className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+441234567890"
                        className="hover:text-yellow-500 transition-colors"
                      >
                        01902 239 339
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-lg">
                    <Mail className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:info@tutoringtosuccess.co.uk"
                        className="hover:text-yellow-500 transition-colors"
                      >
                        admin@tutoringtosuccess.co.uk
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black/5 rounded-lg">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <address className="text-gray-600 not-italic">
                      337 Tettenhall Road
                      <br />
                      Wolverhampton
                      <br />
                      WV6 0SU
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">Opening Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-[500px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2423.4940235032795!2d-2.1624408226845357!3d52.59684063053694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b524d9dced7%3A0x9813f9de96f46667!2sTutoring%20To%20Success!5e0!3m2!1sen!2suk!4v1702931595578!5m2!1sen!2suk"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
}
