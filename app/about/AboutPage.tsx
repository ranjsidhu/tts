"use client";

import Layout from "../components/layout/Layout";
import { BookOpen, Check, Clock, Rocket } from "lucide-react";
import Link from "next/link";
import AboutUsSVG from "./AboutUsSVG";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            About Tutoring To Success
          </h1>
          <p className="text-grey-600 max-w-2xl mx-auto">
            Personalised learning solutions designed to unlock your child&apos;
            full academic potential
          </p>
        </div>

        {/* Content Container */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <AboutUsSVG />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            {/* Key Information Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-black/5 rounded-lg text-yellow-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Experienced Tutors</h3>
              </div>
              <p className="text-grey-600">
                At Tutoring To Success, we have a wealth of experienced,
                competent, and knowledgeable tutors who will personalise a
                learning framework in accordance with the UK curriculum to
                ensure your child makes the anticipated progress. Prior to
                working with us, all tutors are{" "}
                <a
                  href="https://www.gov.uk/criminal-record-checks-become-employer/criminal-record-check-referral-rates"
                  target="_blank"
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  DBS checked
                </a>
                .
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-black/5 rounded-lg text-yellow-400">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Proven Success</h3>
              </div>
              <p className="text-grey-600">
                We are proud that over 80% of our students were offered a place
                in their chosen school, including Thomas Telford, Wolverhampton
                Girls High, and Queen Mary&apos;. We offer a personalised
                service with an initial assessment, allowing for a bespoke plan
                throughout the academic year. We conduct subsequent assessments
                every six months to monitor progress consistently.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-black/5 rounded-lg text-yellow-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Tutoring</h3>
              </div>
              <p className="text-grey-600">
                Tutoring sessions are available face-to-face or online, and can
                be booked individually or as part of a group. Each 60-minute
                session includes 55 minutes of teaching and 5 minutes of
                feedback. Homework is provided at the end of each session, with
                the expectation of completion before the next lesson.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-black/5 rounded-lg text-yellow-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Additional Support</h3>
              </div>
              <p className="text-grey-600">
                In addition to our regular sessions, we offer holiday classes
                and booster sessions before entrance exams and SATs/GCSE
                assessments. Information about these special sessions can be
                found on our{" "}
                <Link
                  href="/offers"
                  className="text-yellow-600 hover:text-yellow-700 underline cursor-pointer"
                >
                  Offers
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
