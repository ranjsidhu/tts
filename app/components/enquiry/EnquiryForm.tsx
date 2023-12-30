"use client";

import { useState } from "react";
import instance from "../../instance";
import "./enquiry.css";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [enquirySent, setEnquirySent] = useState(false);
  const [error, setError] = useState({
    phone: false,
    email: false,
    message: false,
    first_name: false,
    last_name: false,
  });

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendEnquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      phone: false,
      email: false,
      message: false,
      first_name: false,
      last_name: false,
    });
    setEnquirySent(false);
    const data = { ...formData, date: new Date().toUTCString() };

    const emailPhone = data.email || data.phone;
    const validMessage = data.message;

    if (emailPhone && validMessage) {
      instance.post("/enquiry/email", data).then(({ data }) => {
        setFormData(() => ({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        }));
        setEnquirySent(true);
      });
    } else {
      // Error handling for no message entered
      if (!validMessage) {
        setError((prevError) => ({ ...prevError, message: true }));
      }
      // Error handling for email and phone
      if (!data.email && !data.phone) {
        setError((prevError) => ({ ...prevError, email: true, phone: true }));
      } else if (!data.email) {
        setError((prevError) => ({ ...prevError, email: true }));
      } else if (!data.phone) {
        setError((prevError) => ({ ...prevError, phone: true }));
      }
      // Error handling for name
      if (!data.first_name && !data.last_name) {
        setError((prevError) => ({
          ...prevError,
          first_name: true,
          last_name: true,
        }));
      } else if (!data.first_name) {
        setError((prevError) => ({ ...prevError, first_name: true }));
      } else if (!data.last_name) {
        setError((prevError) => ({ ...prevError, last_name: true }));
      }
    }
  };

  return (
    <>
      <h3 className="form-title">Request a free no obligation consultation</h3>
      <p className="form-text">
        Our Admin team will aim to respond to your query within 3 business days
      </p>
      <br />
      <br />
      <form onSubmit={sendEnquiry}>
        <div className="form-row">
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              className={`${error.first_name ? "error" : ""}`}
              name="first_name"
              type="text"
              value={formData.first_name}
              autoComplete="given-name"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              className={`${error.last_name ? "error" : ""}`}
              name="last_name"
              type="text"
              value={formData.last_name}
              autoComplete="family-name"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={`${error.email ? "error" : ""}`}
              name="email"
              type="email"
              value={formData.email}
              autoComplete="email"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className={`${error.phone ? "error" : ""}`}
              name="phone"
              type="text"
              value={formData.phone}
              autoComplete="phone"
              onChange={changeHandler}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className={`${error.message ? "error" : ""}`}
              name="message"
              value={formData.message}
              onChange={changeHandler}
            />
            {error.message && (
              <p className="error-text">Please enter a messsage</p>
            )}
          </div>
        </div>

        <button type="submit">Send Enquiry</button>

        {enquirySent && (
          <p>
            Thank you for your enquiry! Our Admin team will be in touch soon.
          </p>
        )}
      </form>
    </>
  );
}
