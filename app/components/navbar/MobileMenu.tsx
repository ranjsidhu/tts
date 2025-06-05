import Link from "next/link";
import { X } from "lucide-react";
import { links } from "@/app/static";
import type { MobileMenuProps } from "@/app/types";

export default function MobileMenu({ toggleMenu }: Readonly<MobileMenuProps>) {
  return (
    <div className="fixed inset-0 z-60 bg-white/95 flex flex-col backdrop-blur-sm overflow-hidden animate-[fadeIn_150ms_ease-in]">
      <div className="flex justify-between items-center p-4 border-b border-black/30">
        <h2 className="text-xl font-bold text-black">Menu</h2>
        <button
          onClick={toggleMenu}
          className="p-2 text-black hover:text-amber-300 transition-colors duration-100 focus:outline-none"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav
          className="flex flex-col w-full divide-y divide-black/50"
          data-testid="mobile-menu"
        >
          {links.map((route) => (
            <Link
              data-testid={`mobile-menu-link-${route.name}`}
              key={route.href}
              href={route.href}
              onClick={() => toggleMenu()}
              className="px-4 py-3 text-sm text-black font-medium transition-all duration-200 hover:bg-gray-50"
              aria-label={route.name}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 text-center text-black/60 text-sm border-t border-black/50">
        <p>© {new Date().getFullYear()} Tutoring To Success</p>
      </div>
    </div>
  );
}
