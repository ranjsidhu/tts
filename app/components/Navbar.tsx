import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cx from "classnames";
import routes from "../routes";
import styles from "./components.module.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <div
        className={cx(
          styles["menu-toggle"],
          isMobileMenuOpen ? styles.open : ""
        )}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <nav className={cx(styles.nav, isMobileMenuOpen ? styles.open : "")}>
        {routes.map((route: any, index: number) => (
          <Link
            key={route.id}
            href={route.route}
            className={`${styles.navLink} ${
              pathname === route.route && styles.active
            } ${index !== 0 && !isMobileMenuOpen && styles.borderGold} ${
              isMobileMenuOpen && styles.borderBottom
            }`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
