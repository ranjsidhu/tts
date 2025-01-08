import Image from "next/image";
import Navbar from "../navbar/Navbar";
import Logo1 from "../../assets/Logo1.jpeg";
import "./header.css";
import Link from "next/link";

export default function Header({
  setOverlayVisibility,
}: {
  setOverlayVisibility: any;
}) {
  const onNavbarOpen = (visible: boolean) => {
    setOverlayVisibility(visible);
  };

  return (
    <div className="header">
      <div className={`header-logo`}>
        <Link href="/">
          <Image priority src={Logo1} alt="logo" className="logo" />
        </Link>
      </div>

      <div className="navbar">
        <Navbar onNavbarOpen={onNavbarOpen} />
      </div>
      <br />
    </div>
  );
}
