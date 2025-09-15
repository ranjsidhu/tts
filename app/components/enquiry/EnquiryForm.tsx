"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { sanitiseAndValidate } from "@/app/utils/sanitiseInput";
import PageLoading from "../loading/PageLoading";
import type { FormData, FormErrors } from "@/app/types";

const initialFormData: FormData = {
  studentName: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  subjects: "",
  currentSchool: "",
  yearGroup: "",
  tutoringPreference: "",
  availability: "",
  message: "",
};

export default function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const sendEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using imported function
    const newErrors = sanitiseAndValidate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData(initialFormData);
      toast.success("Thank you for your enquiry. We will be in touch shortly.");
    } catch (error) {
      console.error("Failed to send enquiry:", error);
      toast.error("Failed to send enquiry. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form
      onSubmit={sendEnquiry}
      className="space-y-4 w-full max-w-md mx-auto"
      data-testid="enquiry-form"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Student&apos;s Name{" "}
          <input
            required
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.studentName ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter student's name"
            disabled={isLoading}
            data-testid="student-name-input"
          />
        </label>
        {errors.studentName && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="student-name-error"
          >
            {errors.studentName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Parent&apos;s Name{" "}
          <input
            required
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.parentName ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter parent's name"
            disabled={isLoading}
            data-testid="parent-name-input"
          />
        </label>
        {errors.parentName && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-name-error"
          >
            {errors.parentName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Parent&apos;s Phone Number{""}
          <input
            type="tel"
            required
            name="parentPhone"
            value={formData.parentPhone}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.parentPhone ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter phone number (e.g., 07123456789)"
            disabled={isLoading}
            data-testid="parent-phone-input"
          />
        </label>
        {errors.parentPhone && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-phone-error"
          >
            {errors.parentPhone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Parent&apos;s Email
          <input
            required
            type="email"
            name="parentEmail"
            value={formData.parentEmail}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.parentEmail ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter email"
            disabled={isLoading}
            data-testid="parent-email-input"
          />
        </label>
        {errors.parentPhone && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-phone-error"
          >
            {errors.parentPhone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Subjects needed
          <input
            required
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.subjects ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Maths, English, Science"
            disabled={isLoading}
            data-testid="subjects-input"
          />
        </label>
        {errors.parentPhone && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-phone-error"
          >
            {errors.parentPhone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Current School
          <input
            required
            type="text"
            name="currentSchool"
            value={formData.currentSchool}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.currentSchool ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="ABC High School"
            disabled={isLoading}
            data-testid="current-school-input"
          />
        </label>
        {errors.parentPhone && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-phone-error"
          >
            {errors.parentPhone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Year Group
          <input
            required
            type="text"
            name="yearGroup"
            value={formData.yearGroup}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.yearGroup ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Year 1"
            disabled={isLoading}
            data-testid="year-group-input"
          />
        </label>
        {errors.parentPhone && (
          <p
            className="mt-1 text-sm text-red-500"
            data-testid="parent-phone-error"
          >
            {errors.parentPhone}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tuition Setting
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                required
                type="radio"
                name="tutoringPreference"
                value="1:1"
                checked={formData.tutoringPreference === "1:1"}
                onChange={handleChange}
                className="form-radio text-yellow-400"
                disabled={isLoading}
                data-testid="tutoring-1to1"
              />
              <span className="ml-2">1:1</span>
            </label>
            <label className="inline-flex items-center">
              <input
                required
                type="radio"
                name="tutoringPreference"
                value="Group"
                checked={formData.tutoringPreference === "Group"}
                onChange={handleChange}
                className="form-radio text-yellow-400"
                disabled={isLoading}
                data-testid="tutoring-group"
              />
              <span className="ml-2">Group (up to 8 students)</span>
            </label>
          </div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Message{" "}
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none min-h-[100px] resize-y disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="How is the student doing at school? Any specific areas to focus on?"
            disabled={isLoading}
            data-testid="message-input"
          />
        </label>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500" data-testid="message-error">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          What is your availability for sessions?
          <textarea
            required
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.availability ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none min-h-[100px] resize-y disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="E.g, Monday 3-5pm, Wednesday 6-8pm"
            disabled={isLoading}
            data-testid="availability-input"
          />
        </label>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500" data-testid="message-error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-black text-white py-3 rounded-lg font-medium transition-colors
          ${isLoading ? "cursor-not-allowed opacity-75" : "hover:bg-gray-800"}`}
        data-testid="submit-button"
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading && <PageLoading />}
          <span>{isLoading ? "Sending..." : "Submit"}</span>
        </div>
      </button>
    </form>
  );
}
