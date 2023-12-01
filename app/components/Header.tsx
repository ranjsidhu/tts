import Image from "next/image";
import Navbar from "./Navbar";
import Logo1 from "../assets/Logo1.jpeg";
import styles from "./components.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <Image priority src={Logo1} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.navbar}>
        <Navbar />
      </div>
      <br />
    </div>
  );
}
