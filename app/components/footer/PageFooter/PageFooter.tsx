import { links } from "../../../static/static";
import FooterImages from "../FooterImages/FooterImages";
import "./footer.css";

type Link = {
  name: string;
  href: string;
};

export default function PageFooter() {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-flex-1">
          <div className="footer-links">
            {links.map((link: Link, index: number) => (
              <div key={index}>
                <a href={link.href}>{link.name}</a>
              </div>
            ))}
          </div>
          <FooterImages />
          <div className="footer-legal">
            <p>Company Registration Number: 15228068</p>
            <p className="footer-copyright">
              Copyright &copy;{" "}
              <a href={`mailto:${process.env.NEXT_PUBLIC_DEV_EMAIL}`}>
                Ranj Sidhu 2024
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
