"use client";

import Layout from "../components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <br />
      <h3 className="not-found-title">Not Found</h3>
      <br />
      <div className="not-found">
        <p>{"We haven't been able to find the page you requested"}</p>
        <p>
          Click <a href="/">here</a> to go back to the homepage
        </p>
      </div>
    </Layout>
  );
}
