import { config } from "../utils/config";
import { Instagram } from "lucide-react";

interface InstagramLinkProps {
  name: string;
  url: string;
  description: string;
}

const InstagramCard = ({ name, url, description }: InstagramLinkProps) => (
  <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-xl">
    <div className="bg-black rounded-lg p-6 h-full flex flex-col items-center text-center space-y-4 transition-transform hover:scale-105 duration-300">
      <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-3 rounded-full">
        <Instagram className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-300 text-sm flex-grow">{description}</p>
      <button
        type="button"
        onClick={() => window.open(url, '_blank')}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
      >
        Follow Us
      </button>
    </div>
  </div>
);

export default function InstagramSection() {
  return (
    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full bg-black rounded-xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(219, 39, 119, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Connect With Us
            </h2>
            <p className="text-gray-300">Follow our educational journey on Instagram</p>
          </div>
          
          <div className="space-y-4">
            {config.instagramLinks.map((link, index) => (
              <div
                key={link.name}
                className="transform translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <InstagramCard {...link} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute top-12 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-16 right-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}