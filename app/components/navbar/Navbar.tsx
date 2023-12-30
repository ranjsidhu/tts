import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import routes from "../../static/routes";
import "./navbar.css";

interface Route {
  id: number;
  name: string;
  route: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <div
        className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
        {routes.map((route: Route, index: number) => (
          <Link
            key={route.id}
            href={route.route}
            className={`navLink ${pathname === route.route ? "active" : ""} ${
              index !== 0 && !isMobileMenuOpen ? "borderGold" : ""
            } ${isMobileMenuOpen ? "borderBottom" : ""}`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;