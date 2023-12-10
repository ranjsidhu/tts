"use client";
// extracting the client-side logic from the server side

import Image from "next/image";
import instagram from "../../../assets/ig.png";
import facebook from "../../../assets/fb.png";
import twitter from "../../../assets/tw.png";
import "./footer-images.css";

const redirectSocials = (url: string) => {
  if (url !== "") window.open(url);
};

export default function FooterImages() {
  return (
    <div className="socials">
      <Image
        priority
        src={instagram}
        alt="Instagram logo"
        onClick={() =>
          redirectSocials("https://www.instagram.com/tutoringtosuccesslimited/")
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
  );
}
