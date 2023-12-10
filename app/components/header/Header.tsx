import Image from "next/image";
import Navbar from "../navbar/Navbar";
import Logo1 from "../../assets/Logo1.jpeg";
import "./header.css";
import styles from "../components.module.css";

export default function Header() {
  return (
    <div className="header">
      <div>
        <Image priority src={Logo1} alt="logo" className="logo" />
      </div>

      <div className="navbar">
        <Navbar />
      </div>
      <br />
    </div>
  );
}
