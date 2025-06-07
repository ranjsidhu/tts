"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { links } from "@/app/static";
import type { NavbarProps } from "@/app/types";
import Logo1 from "@/app/assets/Logo1.jpeg";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import SignOut from "../auth/SignOut";

export default function Navbar({ session }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className="w-screen flex flex-col justify-center items-center bg-white/95 fixed top-0 left-0 right-0 shadow-sm z-50"
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
              {links.map((route) => (
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
                  `}
                >
                  {route.name}
                </Link>
              ))}
              {session?.user ? (
                <SignOut />
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="text-[#DAA520] text-base font-medium hover:underline transition-colors duration-150 flex items-center whitespace-nowrap"
                >
                  Sign in
                </Link>
              )}
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
        {isMobileMenuOpen && <MobileMenu toggleMenu={toggleMenu} />}
      </div>
    </header>
  );
}
