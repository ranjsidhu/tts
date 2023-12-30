import ContactSVG from "./ContactSVG";
import { svgs } from "../static/static";
import "./contact.css";

const { phone, email, address } = svgs;

export default function ContactMethods() {
  return (
    <address>
      <div className="address-item">
        <ContactSVG
          path={{
            d: phone,
            title: "Phone",
          }}
        />
        <a href="tel:+447309071389" title="Give us a call on +44 73090 71389">
          +44 73090 71389
        </a>
      </div>
      <div className="address-item">
        <ContactSVG
          path={{
            d: email,
            title: "Email",
          }}
        />
        <a
          href="mailto:admin@tutoringtosuccess.co.uk"
          title="Send us an email via admin@tutoringtosuccess.co.uk"
        >
          admin@tutoringtosuccess.co.uk
        </a>
      </div>
      <div className="address-item">
        <ContactSVG
          path={{
            d: address,
            title: "Location filled",
            circle: { cx: 16, cy: 13, r: 4, fill: "none" },
          }}
        />
        <a
          href="https://maps.app.goo.gl/ZwAzca6KPrwSRjYq7"
          target="_blank"
          className="contact-address"
        >
          <p>337 Tettenhall Road</p>
          <p>Wolverhampton</p>
          <p>WV6 0SU</p>
        </a>
      </div>
    </address>
  );
}
