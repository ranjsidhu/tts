"use client";

import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import { useSpring, animated } from "react-spring";
import Link from "next/link";
import routes from "../../static/routes";
import "./navbar.css";

type Route = {
  id: number;
  name: string;
  route: string;
};

const Navbar = ({ onNavbarOpen }: { onNavbarOpen: Function }) => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.UI);

  const pathname = usePathname();
  const isMobile = isMobileMenuOpen ? "open" : "";
  const isActiveRoute = (route: string) => (pathname === route ? "active" : "");
  const isFirstRoute = (index: number) =>
    index !== 0 && !isMobileMenuOpen ? "borderGold" : "";
  const borderBottom = isMobileMenuOpen ? "borderBottom" : "";

  const sidebarAnimation = useSpring({
    left: isMobileMenuOpen ? 0 : -250,
    config: { tension: 0, friction: 0 },
  });

  const setVisibilty = () => {
    const visible = !isMobileMenuOpen;
    onNavbarOpen(visible);
    dispatch(toggleMobileMenu({ visible }));
  };

  const NavbarRoutes = () => {
    return (
      <nav className={`nav ${isMobile} `}>
        {routes.map((route: Route, index: number) => (
          <Link
            key={route.id}
            href={route.route}
            className={`navLink ${isActiveRoute(
              route.route
            )}  ${borderBottom} ${isFirstRoute(index)}`}
            onClick={() => {
              dispatch(toggleMobileMenu({ visible: false }));
            }}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    );
  };

  const MenuToggle = () => {
    return (
      <div className={`menu-toggle ${isMobile}`} onClick={setVisibilty}>
        <div className={`bar ${isMobile}`}></div>
        <div className={`bar ${isMobile}`}></div>
        <div className={`bar ${isMobile}`}></div>
      </div>
    );
  };

  return (
    <>
      {/* Repeated code for CSS animation on closing of sidebar */}
      <div className={`menu-toggle ${isMobile}`} onClick={setVisibilty}>
        <div className={`bar ${isMobile}`}></div>
        <div className={`bar ${isMobile}`}></div>
        <div className={`bar ${isMobile}`}></div>
      </div>
      {isMobileMenuOpen ? (
        <animated.div
          className={`sidebar ${isMobile}`}
          style={sidebarAnimation}
        >
          <MenuToggle />
          <NavbarRoutes />
        </animated.div>
      ) : (
        <NavbarRoutes />
      )}
    </>
  );
};

export default Navbar;
