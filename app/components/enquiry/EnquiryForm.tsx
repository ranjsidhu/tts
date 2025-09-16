"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { sanitiseAndValidate } from "@/app/utils/sanitiseInput";
import type { FormData, FormErrors } from "@/app/types";
import { config } from "@/app/utils/config";
import {
  TextArea,
  TextInput,
  SubmitButton,
  RadioInput,
  RadioGroup,
} from "../form";
import { sendEmail } from "./serveractions";

export default function EnquiryForm() {
  const { initialEnquiryFormData } = config;
  const [formData, setFormData] = useState<FormData>(initialEnquiryFormData);
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
      await sendEmail(formData);
      setFormData(initialEnquiryFormData);
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
      <TextInput
        required
        name="studentName"
        value={formData.studentName}
        onChange={handleChange}
        placeholder="Enter student's name"
        disabled={isLoading}
        data-testid="student-name-input"
        isError={!!errors.studentName}
        errorMessage={errors.studentName}
        labelText="Student's Name"
      />

      <TextInput
        required
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        placeholder="Enter parent's name"
        disabled={isLoading}
        data-testid="parent-name-input"
        isError={!!errors.parentName}
        errorMessage={errors.parentName}
        labelText="Parent's Name"
      />

      <TextInput
        type="tel"
        required
        name="parentPhone"
        value={formData.parentPhone}
        onChange={handleChange}
        placeholder="Enter phone number (e.g., 07123456789)"
        disabled={isLoading}
        data-testid="parent-phone-input"
        isError={!!errors.parentPhone}
        errorMessage={errors.parentPhone}
        labelText="Parent's Phone Number"
      />

      <TextInput
        required
        type="email"
        name="parentEmail"
        value={formData.parentEmail}
        onChange={handleChange}
        placeholder="Enter email"
        disabled={isLoading}
        data-testid="parent-email-input"
        isError={!!errors.parentEmail}
        errorMessage={errors.parentEmail}
        labelText="Parent's Email"
      />

      <TextInput
        required
        name="subjects"
        value={formData.subjects}
        onChange={handleChange}
        placeholder="Maths, English, Science"
        disabled={isLoading}
        data-testid="subjects-input"
        isError={!!errors.subjects}
        errorMessage={errors.subjects}
        labelText="Subjects"
      />

      <TextInput
        required
        type="text"
        name="currentSchool"
        value={formData.currentSchool}
        onChange={handleChange}
        placeholder="ABC High School"
        disabled={isLoading}
        data-testid="current-school-input"
        isError={!!errors.currentSchool}
        errorMessage={errors.currentSchool}
        labelText="Current School"
      />

      <TextInput
        required
        type="text"
        name="yearGroup"
        value={formData.yearGroup}
        onChange={handleChange}
        placeholder="Year 1"
        disabled={isLoading}
        data-testid="year-group-input"
        isError={!!errors.yearGroup}
        errorMessage={errors.yearGroup}
        labelText="Year Group"
      />

      <RadioGroup formGroupLabel="Tuition Setting">
        <RadioInput
          required
          name="tutoringPreference"
          value="1:1"
          checked={formData.tutoringPreference === "1:1"}
          onChange={handleChange}
          className="form-radio text-yellow-400"
          disabled={isLoading}
          data-testid="tutoring-1to1"
          radioText="1:1"
        />
        <RadioInput
          required
          name="tutoringPreference"
          value="Group"
          checked={formData.tutoringPreference === "Group"}
          onChange={handleChange}
          disabled={isLoading}
          data-testid="tutoring-group"
          radioText="Group (up to 8 students)"
        />
      </RadioGroup>

      <TextArea
        required
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="How is the student doing at school? Any specific areas to focus on?"
        disabled={isLoading}
        data-testid="message-input"
        isError={!!errors.message}
        errorMessage={errors.message}
        labelText="Message"
      />

      <TextArea
        required
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        placeholder="E.g, Monday 3-5pm, Wednesday 6-8pm"
        disabled={isLoading}
        data-testid="availability-input"
        isError={!!errors.availability}
        errorMessage={errors.availability}
        labelText="What is your availability for sessions?"
      />

      <SubmitButton isLoading={isLoading} />
    </form>
  );
}
