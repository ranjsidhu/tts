"use client";

import Link from "next/link";
import Layout from "../components/layout/Layout";
import "./not-found.css";

export default function NotFound() {
  return (
    <Layout>
      <br />
      <h3 className="not-found-title">Not Found</h3>
      <br />
      <div className="not-found">
        <p>We haven&apos;t been able to find the page you requested</p>
        <p>
          Click <Link href="/">here</Link> to go back to the homepage
        </p>
      </div>
    </Layout>
  );
}
