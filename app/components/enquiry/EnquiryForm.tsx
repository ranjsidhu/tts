"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../utils/instance";
import { sanitiseAndValidate } from "@/app/utils/sanitiseInput";
import PageLoading from "../loading/PageLoading";
import { FormData, FormErrors } from "@/app/types";

const initialFormData: FormData = {
  studentName: "",
  parentName: "",
  parentPhone: "",
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
      await instance.post("/enquiry/email", formData);
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
      className="space-y-4 w-full max-w-md"
      data-testid="enquiry-form"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Student&apos;s Name{" "}
        </label>
        <input
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
        </label>
        <input
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
          Parent&apos;s Phone Number{" "}
        </label>
        <input
          type="tel"
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
          Message{" "}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none min-h-[100px] resize-y disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter your message"
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
