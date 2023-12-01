"use client";

import Image from "next/image";
import instagram from "./ig.png";
import facebook from "./fb.png";
import twitter from "./tw.png";
import styles from "./components.module.css";

const redirectSocials = (url: string) => {
  if (url !== "") window.open(url);
};

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Bookings",
    href: "/bookings",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Testimonials",
    href: "/testimonials",
  },
  {
    name: "Offers",
    href: "/offers",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Sitemap",
    href: "/sitemap.xml",
  },
];

export default function PageFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerFlex1}>
          <div className={styles.footerLinks}>
            {links.map((link: any, index: number) => (
              <div key={index}>
                <a
                  href={link.href}
                  target={link.name === "Online" ? "_blank" : ""}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.socials}>
            <Image
              priority
              src={instagram}
              alt="Instagram logo"
              onClick={() =>
                redirectSocials(
                  "https://www.instagram.com/tutoringtosuccesslimited/"
                )
              }
            />
            <Image
              priority
              src={facebook}
              alt="Facebook logo"
              onClick={() => redirectSocials("")}
            />
            <Image
              priority
              src={twitter}
              alt="Twitter logo"
              onClick={() => redirectSocials("")}
            />
          </div>
          <div className={styles.footerLegal}>
            <p>Company Registration Number: 15228068</p>
            <p>Copyright &copy; Ranjeet Sidhu 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
