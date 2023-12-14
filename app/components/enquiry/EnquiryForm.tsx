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
    const data = { ...formData, date: new Date().toUTCString() };
    instance
      .post("/enquiry/email", data)
      .then(({ data }) => console.log(data.message));
    console.log("🚀 ~ file: EnquiryForm.tsx:19 ~ sendEnquiry ~ data:", data);
  };

  return (
    <>
      <h3 className="form-title">Request a free no obligation consultation</h3>
      <br />
      <br />
      <form onSubmit={sendEnquiry}>
        <div className="form-row">
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
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
              name="email"
              type="text"
              value={formData.email}
              autoComplete="email"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
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
              name="message"
              value={formData.message}
              onChange={changeHandler}
            />
          </div>
        </div>

        <button type="submit">Send Enquiry</button>
      </form>
    </>
  );
}
