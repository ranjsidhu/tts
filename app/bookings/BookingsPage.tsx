"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import "./bookings.css";

export default function BookingsPage() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    subject: "Maths",
    keyStage: "KS1",
    groupOrIndividual: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.persist();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, time: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      groupOrIndividual: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.groupOrIndividual === "individual") {
      window.open("https://buy.stripe.com/28o7sMgyw76h4cUaEF");
    } else {
      window.open("https://buy.stripe.com/8wM6oIfus9ep6l2bIK");
    }
  };

  return (
    <>
      <Layout>
        <br />
        <h3 className="bookings-title">Make a Booking</h3>
        <br />
        <br />
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="lessonDate">Select a Date:</label>
          <input
            type="date"
            name="date"
            id="lessonDate"
            required
            value={formData.date}
            onChange={handleInputChange}
          />

          <br />
          <br />

          <label htmlFor="lessonTime">Select a Time:</label>
          <input
            type="time"
            min="16:00"
            max="21:00"
            id="lessonTime"
            required
            value={formData.time}
            onChange={handleTimeChange}
          />
          <br />
          <br />

          <label htmlFor="lessonSubject">Select a subject:</label>
          <select
            id="lessonSubject"
            required
            value={formData.subject}
            onChange={handleInputChange}
          >
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="11plus">11+</option>
          </select>
          <br />
          <br />

          <label htmlFor="lessonSubject">Select a key stage:</label>
          <select
            id="lessonSubject"
            required
            value={formData.keyStage}
            onChange={handleInputChange}
          >
            <option value="KS1">KS1/KS2</option>
            <option value="KS3">KS3/KS4</option>
            <option value="Alevel">A-Level</option>
          </select>
          <br />
          <br />

          <div className="type">
            <label htmlFor="lessonDate">Group</label>
            <input
              type="radio"
              name="grouporind"
              value="group"
              onChange={handleRadioChange}
              checked={formData.groupOrIndividual === "group"}
              required
            />
            <br />
            <br />
            <label htmlFor="lessonDate">Individual</label>
            <input
              type="radio"
              name="grouporind"
              value="individual"
              onChange={handleRadioChange}
              checked={formData.groupOrIndividual === "individual"}
              required
            />
            <br />
            <br />
          </div>

          <br />
          <br />

          <button type="submit">Continue to payment</button>

          <br />
          <br />

          <p className="disclaimer">
            Please note: payments are taken on a monthly basis
          </p>
          <p className="disclaimer">
            If you would like an alternative payment structure, please contact{" "}
            <a
              className="admin-link"
              href="mailto:admin@tutoringtosuccess.co.uk"
            >
              <strong>Admin</strong>
            </a>
          </p>
        </form>
      </Layout>
    </>
  );
}
