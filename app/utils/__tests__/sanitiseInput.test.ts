import { sanitiseAndValidate } from "../sanitiseInput";
import type { FormData } from "@/app/types";

describe("sanitiseAndValidate", () => {
  const validFormData: FormData = {
    studentName: "John Smith",
    parentName: "Jane Smith",
    parentPhone: "+447123456789",
    parentEmail: "test@test.com",
    subjects: "Maths, Science",
    currentSchool: "Test School",
    yearGroup: "Year 10",
    tutoringPreference: "In-person",
    availability: "Weekends",
    message: "This is a valid test message for the enquiry form.",
  };

  describe("Student Name Validation", () => {
    it("accepts valid student names", () => {
      const result = sanitiseAndValidate(validFormData);
      expect(result.studentName).toBeUndefined();
    });

    it("rejects names that are too short", () => {
      const data = { ...validFormData, studentName: "A" };
      const result = sanitiseAndValidate(data);
      expect(result.studentName).toBe(
        "Student name must be at least 2 characters"
      );
    });

    it("rejects names that are too long", () => {
      const data = { ...validFormData, studentName: "A".repeat(51) };
      const result = sanitiseAndValidate(data);
      expect(result.studentName).toBe(
        "Student name must be less than 50 characters"
      );
    });

    it("sanitizes special characters from student name", () => {
      const data = { ...validFormData, studentName: "John123!@#Smith" };
      const result = sanitiseAndValidate(data);
      expect(result.studentName).toBeUndefined();
    });
  });

  describe("Parent Name Validation", () => {
    it("accepts valid parent names", () => {
      const result = sanitiseAndValidate(validFormData);
      expect(result.parentName).toBeUndefined();
    });

    it("rejects names that are too short", () => {
      const data = { ...validFormData, parentName: "A" };
      const result = sanitiseAndValidate(data);
      expect(result.parentName).toBe(
        "Parent name must be at least 2 characters"
      );
    });

    it("rejects names that are too long", () => {
      const data = { ...validFormData, parentName: "A".repeat(51) };
      const result = sanitiseAndValidate(data);
      expect(result.parentName).toBe(
        "Parent name must be less than 50 characters"
      );
    });

    it("sanitizes special characters from parent name", () => {
      const data = { ...validFormData, parentName: "Jane123!@#Smith" };
      const result = sanitiseAndValidate(data);
      expect(result.parentName).toBeUndefined();
    });
  });

  describe("Phone Number Validation", () => {
    it("accepts valid UK phone numbers with +44", () => {
      const result = sanitiseAndValidate(validFormData);
      expect(result.parentPhone).toBeUndefined();
    });

    it("accepts valid UK phone numbers starting with 0", () => {
      const data = { ...validFormData, parentPhone: "07123456789" };
      const result = sanitiseAndValidate(data);
      expect(result.parentPhone).toBeUndefined();
    });

    it("rejects invalid phone numbers", () => {
      const data = { ...validFormData, parentPhone: "123456" };
      const result = sanitiseAndValidate(data);
      expect(result.parentPhone).toBe("Please enter a valid UK phone number");
    });

    it("sanitizes non-numeric characters from phone number", () => {
      const data = { ...validFormData, parentPhone: "+44-712-345-6789" };
      const result = sanitiseAndValidate(data);
      expect(result.parentPhone).toBeUndefined();
    });
  });

  describe("Message Validation", () => {
    it("accepts valid messages", () => {
      const result = sanitiseAndValidate(validFormData);
      expect(result.message).toBeUndefined();
    });

    it("rejects messages that are too short", () => {
      const data = { ...validFormData, message: "Short msg" };
      const result = sanitiseAndValidate(data);
      expect(result.message).toBe("Message must be at least 10 characters");
    });

    it("rejects messages that are too long", () => {
      const data = { ...validFormData, message: "A".repeat(501) };
      const result = sanitiseAndValidate(data);
      expect(result.message).toBe("Message must be less than 500 characters");
    });

    it("sanitizes HTML tags from message", () => {
      const data = {
        ...validFormData,
        message: "<script>alert('test')</script> Valid message here",
      };
      const result = sanitiseAndValidate(data);
      expect(result.message).toBeUndefined();
    });

    it("allows basic punctuation in message", () => {
      const data = {
        ...validFormData,
        message: "Hello, this is a test message! How are you?",
      };
      const result = sanitiseAndValidate(data);
      expect(result.message).toBeUndefined();
    });
  });

  describe("Multiple Field Validation", () => {
    it("returns multiple errors when multiple fields are invalid", () => {
      const data = {
        studentName: "A",
        parentName: "B",
        parentPhone: "invalid",
        parentEmail: "",
        subjects: "",
        currentSchool: "",
        yearGroup: "",
        tutoringPreference: "",
        availability: "",
        message: "short",
      };
      const result = sanitiseAndValidate(data);

      expect(result.studentName).toBe(
        "Student name must be at least 2 characters"
      );
      expect(result.parentName).toBe(
        "Parent name must be at least 2 characters"
      );
      expect(result.parentPhone).toBe("Please enter a valid UK phone number");
      expect(result.message).toBe("Message must be at least 10 characters");
    });

    it("returns no errors when all fields are valid", () => {
      const result = sanitiseAndValidate(validFormData);
      expect(Object.keys(result).length).toBe(0);
    });
  });
});
