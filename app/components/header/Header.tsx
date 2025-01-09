import Navbar from "../navbar/Navbar";
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
      <div className="navbar">
        <Navbar onNavbarOpen={onNavbarOpen} />
      </div>
      <br />
    </div>
  );
}
