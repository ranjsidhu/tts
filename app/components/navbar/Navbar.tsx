"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleMobileMenu } from "@/lib/features/UI";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/app/static";
import Logo1 from "@/app/assets/Logo1.jpeg";
import MenuButton from "./MenuButton";

type NavbarProps = {
  onNavbarOpen: Function;
};

export default function Navbar({ onNavbarOpen }: Readonly<NavbarProps>) {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.UI);
  const pathname = usePathname();

  const toggleMenu = () => {
    const visible = !isMobileMenuOpen;
    onNavbarOpen(visible);
    dispatch(toggleMobileMenu({ visible }));
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50"
      data-testid="navbar-container"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <Link href="/" className="h-20 text-xl font-bold">
            <Image
              src={Logo1}
              alt="Logo"
              width={200}
              height={56}
              className="h-20 w-auto"
              data-testid="logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex-1 max-sm:hidden" data-testid="desktop-nav">
            <div className="flex items-center justify-end space-x-1">
              {links.map((route, index: number) => (
                <Link
                  data-testid={`navbar-link-${route.name}`}
                  key={route.href}
                  href={route.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium
                    transition-all duration-300 ease-in-out
                    hover:text-white hover:bg-black hover:rounded-xl
                    ${
                      pathname === route.href
                        ? "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-yellow-400"
                        : ""
                    }
                    ${index !== 0 ? "border-l-2 border-yellow-400" : ""}
                  `}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <MenuButton
            data-testid="mobile-menu-button"
            toggleMenu={toggleMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/20 sm:hidden"
              />

              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 bg-white sm:hidden border-t border-gray-100 shadow-lg"
              >
                <nav className="flex flex-col py-2" data-testid="mobile-menu">
                  {links.map((route) => (
                    <Link
                      data-testid={`mobile-menu-link-${route.name}`}
                      key={route.href}
                      href={route.href}
                      onClick={() => {
                        dispatch(toggleMobileMenu({ visible: false }));
                      }}
                      className={`
                        px-4 py-3 text-sm font-medium
                        transition-all duration-200
                        hover:bg-gray-50
                        ${
                          pathname === route.href
                            ? "text-black border-l-4 border-yellow-400 bg-gray-50"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
