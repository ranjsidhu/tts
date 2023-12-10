"use client";

import Layout from "../components/layout/Layout";
import "./testimonials.css";

interface Testimonial {
  content: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      "Tutoring to Success has given me a strong platform to achieve great things at university as a medical student. The support, reliability and hard work from their tutors is amazing",
    author: "Simran, Year 13",
  },
  {
    content:
      "Thank you so much for helping our daughter achieve her goals of passing her 11+ entrance exams. Your expertise helped her gain the knowledge she needed",
    author: "Parent of Amanda, Year 6",
  },
  {
    content:
      "I would always recommend Tutoring to Success! Reliable, friendly, professional and a great knowledge of the Maths & English curriculum",
    author: "Sienna, Year 11",
  },
];

export default function TestimonialsPage() {
  return (
    <Layout>
      <br />
      <h3 className="testimonials-title">Testimonials</h3>
      <br />
      <div className="testimonial">
        <div className="center">
          {testimonials.map((tmnl: Testimonial, index: number) => (
            <div className="testimonial-caption" key={index}>
              <p>
                <em>{tmnl.content}</em>
              </p>
              <br />
              <p>{tmnl.author}</p>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
