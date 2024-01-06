"use client";

import { useState } from "react";
import "./vacanciesform.css";

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

const initialErrorState = {
  phone: false,
  email: false,
  message: false,
  first_name: false,
  last_name: false,
};

export default function VacanciesForm() {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState({ ...initialErrorState });

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ ...initialErrorState });
    setFormData(() => ({ ...initialFormData }));
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Send</button>
    </form>
  );
}
