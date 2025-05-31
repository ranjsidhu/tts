import Layout from "@/app/components/layout/Layout";
import { config } from "@/lib/config";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using Tutoring to Success (TTS), you accept and
              agree to be bound by the terms and conditions of this agreement.
              If you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-700">
              Tutoring to Success (TTS) provides a platform connecting students
              with qualified tutors. Our services include:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Matching students with qualified tutors</li>
              <li>Facilitating online and in-person tutoring sessions</li>
              <li>Providing educational resources and materials</li>
              <li>Managing scheduling and payment processing</li>
              <li>Offering academic support and guidance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700">
              To access our tutoring services, you must register for an account.
              You agree to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Promptly update any changes to your information</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>
                Provide accurate academic information for proper tutor matching
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Tutoring Services
            </h2>
            <p className="text-gray-700">
              Our tutoring services are subject to the following terms:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Tutors are independent contractors, not employees of TTS</li>
              <li>Session scheduling is subject to tutor availability</li>
              <li>Cancellation policies must be followed for refunds</li>
              <li>Quality of tutoring services may vary by tutor</li>
              <li>We reserve the right to change or discontinue services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Payment Terms</h2>
            <p className="text-gray-700">Payment terms for our services:</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>All fees are due in advance of tutoring sessions</li>
              <li>Refunds are subject to our cancellation policy</li>
              <li>Prices may be changed with notice</li>
              <li>Payment methods must be valid and current</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content, materials, and resources provided through our service
              are protected by intellectual property rights. Users may not:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Copy or distribute our materials without permission</li>
              <li>Use our content for commercial purposes</li>
              <li>Modify or create derivative works</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700">TTS is not liable for:</p>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>Academic outcomes or performance</li>
              <li>Actions or conduct of tutors</li>
              <li>Technical issues during online sessions</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Users will
              be notified of significant changes. Continued use of the service
              constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              9. Contact Information
            </h2>
            <p className="text-gray-700">
              For questions about these Terms, please contact us at:
              <br />
              Email: {config.adminEmail}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by and construed in accordance with
              the laws of your jurisdiction, without regard to its conflict of
              law provisions.
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

export default TermsOfService;
