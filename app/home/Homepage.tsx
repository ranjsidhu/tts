import Layout from "../components/layout/Layout";
import { features } from "../static";
import HeroSVG from "./HeroSVG";
import EnquiryForm from "../components/enquiry/EnquiryForm";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="text-yellow-400 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default function Homepage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 md:py-32 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Unlock Your Child&apos;s
              <span className="text-yellow-400"> Academic Potential</span>
            </h1>
            <p className="text-lg text-gray-300">
              Expert tuition in Mathematics, English, and Science for students
              aged 7-16.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#enquiry"
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
            <HeroSVG />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section id="enquiry" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-gray-600">
                Fill in the form below and we&apos;ll get back to you within 2
                business days
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
