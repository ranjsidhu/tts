"use client";
import Layout from "../components/layout/Layout";
import "./pricing.css";

export default function PricingPage() {
  return (
    <Layout>
      <div className="pricing">
        <br />
        <h1 className="pricing-title">Pricing</h1>
        <br />
        <div>
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Academic Stage</th>
                <th>Group</th>
                <th>Individual</th>
                <th>2:1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KS1/KS2</td>
                <td>£15</td>
                <td>£27</td>
                <td>£20</td>
              </tr>
              <tr>
                <td>KS3/KS4</td>
                <td>£15</td>
                <td>£27</td>
                <td>£20</td>
              </tr>
              <tr>
                <td>A-Level</td>
                <td>£18</td>
                <td>£33</td>
                <td>£22</td>
              </tr>
              <tr>
                <td>11+</td>
                <td>£16</td>
                <td>£32</td>
                <td>£22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <p className="disclaimer">* All prices are an hourly rate</p>
        <p className="disclaimer">
          ** Prices for blast/booster sessions will be added to the{" "}
          <a href="/offers" className="offers-link">
            Offers
          </a>{" "}
          page in due course
        </p>
      </div>
    </Layout>
  );
}
