import Header from "../header/Header";
import LayoutMain from "./LayoutMain";
import PageFooter from "../footer/PageFooter/PageFooter";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <LayoutMain>
        <Header />
        <div>{children}</div>
      </LayoutMain>
      <PageFooter />
    </div>
  );
}
