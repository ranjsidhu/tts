import { links } from "../../../static/static";
import FooterImages from "../FooterImages/FooterImages";
import "./footer.css";

interface Link {
  name: string;
  href: string;
}

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
            <p>Copyright &copy; Ranjeet Sidhu 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}
