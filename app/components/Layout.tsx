import Header from "./Header";
import LayoutMain from "./LayoutMain";
import PageFooter from "./PageFooter";
import styles from "./components.module.css";

export default function Layout({ children }: { children: any }) {
  return (
    <div className={styles.container}>
      <LayoutMain>
        <Header />
        <div>{children}</div>
      </LayoutMain>
      <PageFooter />
    </div>
  );
}
