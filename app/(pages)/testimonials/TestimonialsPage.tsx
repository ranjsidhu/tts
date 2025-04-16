import { Quote } from "lucide-react";
import Layout from "../../components/layout/Layout";
import { testimonials } from "../../static";
import Link from "next/link";

export default function TestimonialsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Student Success Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our students and parents have to say about their journey
            with Tutoring to Success.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-[fadeInUp_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-yellow-400" />
              </div>

              {/* Content */}
              <blockquote className="mb-6">
                <p className="text-gray-700 italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="border-t pt-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-black">
                    {testimonial.author}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {testimonial.role}
                  </span>
                  {testimonial.subject && (
                    <span className="text-yellow-600 text-sm mt-1">
                      {testimonial.subject}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-black text-white p-8 rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-gray-300 mb-6">
              Join our community of successful students and take the first step
              towards academic excellence.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
