import Image from "next/image";
import Navbar from "../navbar/Navbar";
import Logo1 from "../../assets/Logo1.jpeg";
import "./header.css";

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
        <a href="/">
          <Image priority src={Logo1} alt="logo" className="logo" />
        </a>
      </div>

      <div className="navbar">
        <Navbar onNavbarOpen={onNavbarOpen} />
      </div>
      <br />
    </div>
  );
}
