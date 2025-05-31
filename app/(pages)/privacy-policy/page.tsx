import Layout from "@/app/components/layout/Layout";
import { config } from "@/lib/config";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We collect information that you provide directly to us, including
              when you create an account, use our services, or communicate with
              us. This may include:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Usage data and preferences</li>
              <li>Communication records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. Information Sharing
            </h2>
            <p className="text-gray-700">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
            <p className="text-gray-700">You have the right to:</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              Email: {config.adminEmail}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last Updated&quot; date.
            </p>
            <p className="text-gray-700 mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
