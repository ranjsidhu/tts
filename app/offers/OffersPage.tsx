import { Sparkles, Zap, Rocket, Clock, CheckCircle2 } from "lucide-react";
import Layout from "../components/layout/Layout";

interface OfferCard {
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  comingSoon?: boolean;
}

const offers: OfferCard[] = [
  {
    title: "Booster Sessions",
    description:
      "Intensive catch-up sessions designed to rapidly improve understanding in specific topics.",
    icon: <Rocket className="w-6 h-6" />,
    features: [
      "Focused 2-hour sessions",
      "Targeted topic coverage",
      "Practice questions included",
      "Progress assessment",
    ],
    comingSoon: true,
  },
  {
    title: "Exam Blast",
    description:
      "Comprehensive exam preparation sessions to boost confidence and performance.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Past paper practice",
      "Exam technique coaching",
      "Time management strategies",
      "Common pitfalls covered",
    ],
    comingSoon: true,
  },
  {
    title: "Holiday Intensives",
    description:
      "Make the most of school breaks with our intensive catch-up and advancement programs.",
    icon: <Sparkles className="w-6 h-6" />,
    features: [
      "Daily sessions available",
      "Structured learning path",
      "Homework support",
      "Progress tracking",
    ],
    comingSoon: true,
  },
];

export default function OffersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Special Offers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get ready for our upcoming special offers and intensive sessions
            designed to boost your academic performance.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="relative flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
            >
              {offer.comingSoon && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Coming Soon
                </div>
              )}

              <div className="flex-grow p-6">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-black/5 rounded-lg text-yellow-400">
                    {offer.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{offer.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {offer.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Details coming soon</span>
                  </div>
                  <button
                    className="text-sm font-medium text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
                    disabled={offer.comingSoon}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        {/* <div className="bg-black text-white rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Be the first to know when our special offers become available. Sign
            up for our newsletter to receive updates.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
            Notify Me
          </button>
        </div> */}
      </div>
    </Layout>
  );
}
