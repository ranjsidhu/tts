"use client";

import Layout from "../components/layout/Layout";
import ContactMethods from "./ContactMethods";
import { iframeLoc } from "../static/static";
import "./contact.css";

export default function ContactPage() {
  return (
    <Layout>
      <div className="contact">
        <br />
        <h1 className="contact-title">Contact Us</h1>
        <br />
        <div className="methods">
          <ContactMethods />
        </div>
        <br />
        <br />
        <iframe
          className="iframe"
          src={iframeLoc}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}
