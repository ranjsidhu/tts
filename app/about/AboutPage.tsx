"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import j3 from "../assets/j3.jpeg";
import Layout from "../components/Layout";
import "./about.css";

export default function AboutPage() {
  const router = useRouter();
  return (
    <Layout>
      <div className="about">
        <br />
        <h3>About Us</h3>
        <br />
        <div className="about-image-wrapper">
          <Image
            priority
            src={j3}
            alt="Child studying"
            className="about-image"
          />
        </div>
        <br />

        <div className="about-text-items">
          <div>
            <p className="text-item">
              At Tutoring To Success, we have a plethora of experienced,
              competent, and knowledgable tutors who will personalise a learning
              framework in accordance with the UK curriculum to ensure your
              child makes the progress anticipated of them. Prior to working
              with Tutoring To Success, all tutors are
              <b>
                <a
                  href="https://www.mind.org.uk/information-support/legal-rights/dbs-checks-and-your-mental-health/about-dbs-checks/#:~:text=A%20DBS%20check%20is%20a,for%20Disclosure%20and%20Barring%20Service."
                  target="_blank"
                >
                  {" "}
                  DBS checked
                </a>
              </b>
              .
            </p>
          </div>
          <div>
            <p className="text-item">
              We are proud of the fact that over 80% of our students were
              offered a place in the school of their choice including Thomas
              Telford, Wolverhampton Girls High and Queen Marys. Tutoring To
              Success offers a personalised service with an initial assessment
              made allowing for a bespoke plan to be made over the academic
              year. Every 6 months, subsequent assessments are made to regularly
              monitor the progress made.
            </p>
          </div>
          <div>
            <p className="text-item">
              {" "}
              Tutoring sessions are offered either face-to-face or online and
              can be booked individually or as part of a group. Duration of
              lessons consist of 55 minutes of teaching and 5 minutes of
              feedback at the end of the session. Homework is provided at the
              end of each session with the expecation of completion before the
              next session.
            </p>
          </div>
          <div>
            <p className="text-item">
              In addition to our regular sessions, we offer holiday classes and
              booster sessions prior to entrance exams and SATs/GCSE
              assessments. Information of these sessions will be found on the{" "}
              <span
                className="text-item-link"
                onClick={() => {
                  router.push("/offers");
                }}
              >
                Offers
              </span>{" "}
              page.
            </p>
          </div>
          <div>
            <p className="text-item"></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
