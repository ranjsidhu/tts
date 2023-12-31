"use client";

import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
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
      <MenuToggle />

      {isMobileMenuOpen ? (
        <div className={`sidebar ${isMobile}`}>
          <MenuToggle />
          <NavbarRoutes />
        </div>
      ) : (
        <NavbarRoutes />
      )}
    </>
  );
};

export default Navbar;
