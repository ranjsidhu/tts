"use client";

import Image from "next/image";

import ImageCarousel from "../components/carousel/ImageCarousel";
import j from "../assets/j.jpeg";
import j2 from "../assets/j2.jpeg";
import ranj from "../assets/ranj.jpeg";
import gora from "../assets/gora.jpg";
import Layout from "../components/layout/Layout";
import "./homepage.css";

const images = [j, j2, ranj, gora];

export default function Homepage() {
  return (
    <Layout>
      <div className="img-wrapper">
        <div className="images">
          <Image priority src={j} alt="Primary school student studying" />
          <Image priority src={ranj} alt="Sixth form student studying" />
          <Image priority src={gora} alt="Primary school student studying" />
          <Image priority src={j2} alt="Primary school student studying" />
        </div>
        <div className="carousel">
          <ImageCarousel images={images} />
        </div>
      </div>

      <br />
      <p className="quote">
        We provide a bespoke service to enable your child to be the best version
        of themselves
      </p>
    </Layout>
  );
}
