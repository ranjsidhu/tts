import type { FormData } from "@/app/types";

// Mock fetch globally
global.fetch = jest.fn();

// Mock environment variable before importing the module
const originalEnv = process.env;

describe("serveractions", () => {
  let sendEmail: (formData: FormData) => Promise<void>;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    // Re-import the module to get the updated environment variable
    jest.resetModules();
    const serveractions = require("../serveractions");
    sendEmail = serveractions.sendEmail;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("sendEmail", () => {
    const mockFormData: FormData = {
      studentName: "John Doe",
      parentName: "Jane Doe",
      parentPhone: "07123456789",
      parentEmail: "parent@example.com",
      subjects: "Maths, English",
      currentSchool: "Test School",
      yearGroup: "Year 10",
      tutoringPreference: "1:1",
      availability: "Monday 3-5pm",
      message: "Test message",
    };

    it("sends email with correct configuration", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(mockFormData);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockFormData),
        }
      );
    });

    it("sends email with correct URL from environment variable", async () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://test-site.com";

      // Re-import the module to get the updated environment variable
      jest.resetModules();
      const serveractions = require("../serveractions");
      const sendEmailWithNewEnv = serveractions.sendEmail;

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmailWithNewEnv(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://test-site.com/api/enquiry",
        expect.any(Object)
      );
    });

    it("handles successful response", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(
        new Response("Email sent successfully", { status: 200 })
      );

      await expect(sendEmail(mockFormData)).resolves.toBeUndefined();
    });

    it("handles network error", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValue(networkError);

      await expect(sendEmail(mockFormData)).rejects.toThrow("Network error");
    });

    it("handles HTTP error response", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(
        new Response("Server Error", { status: 500 })
      );

      // The function doesn't check response status, so it should resolve
      await expect(sendEmail(mockFormData)).resolves.toBeUndefined();
    });

    it("handles 404 error response", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("Not Found", { status: 404 }));

      // The function doesn't check response status, so it should resolve
      await expect(sendEmail(mockFormData)).resolves.toBeUndefined();
    });

    it("handles 400 error response", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("Bad Request", { status: 400 }));

      // The function doesn't check response status, so it should resolve
      await expect(sendEmail(mockFormData)).resolves.toBeUndefined();
    });

    it("sends correct JSON body", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(mockFormData);

      const callArgs = mockFetch.mock.calls[0];
      const requestConfig = callArgs[1];
      expect(requestConfig?.body).toBe(JSON.stringify(mockFormData));
    });

    it("sends correct headers", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(mockFormData);

      const callArgs = mockFetch.mock.calls[0];
      const requestConfig = callArgs[1];
      expect(requestConfig?.headers).toEqual({
        "Content-Type": "application/json",
      });
    });

    it("sends POST request", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(mockFormData);

      const callArgs = mockFetch.mock.calls[0];
      const requestConfig = callArgs[1];
      expect(requestConfig?.method).toBe("POST");
    });

    it("handles empty form data", async () => {
      const emptyFormData: FormData = {
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

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(emptyFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emptyFormData),
        }
      );
    });

    it("handles form data with special characters", async () => {
      const specialCharFormData: FormData = {
        studentName: "José María",
        parentName: "O'Connor-Smith",
        parentPhone: "+44 20 7946 0958",
        parentEmail: "test+tag@example.co.uk",
        subjects: "Maths & Science, English Literature",
        currentSchool: "St. Mary's School",
        yearGroup: "Year 11",
        tutoringPreference: "Group",
        availability: "Monday 3-5pm, Wednesday 6-8pm",
        message: "Hello! How are you? I'm interested in tutoring for my child.",
      };

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmail(specialCharFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(specialCharFormData),
        }
      );
    });

    it("handles undefined environment variable", async () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;

      // Re-import the module to get the updated environment variable
      jest.resetModules();
      const serveractions = require("../serveractions");
      const sendEmailWithUndefinedEnv = serveractions.sendEmail;

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmailWithUndefinedEnv(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        "undefined/api/enquiry",
        expect.any(Object)
      );
    });

    it("handles null environment variable", async () => {
      process.env.NEXT_PUBLIC_SITE_URL = null as any;

      // Re-import the module to get the updated environment variable
      jest.resetModules();
      const serveractions = require("../serveractions");
      const sendEmailWithNullEnv = serveractions.sendEmail;

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      await sendEmailWithNullEnv(mockFormData);

      expect(mockFetch).toHaveBeenCalledWith(
        "null/api/enquiry",
        expect.any(Object)
      );
    });

    it("handles fetch timeout", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      const timeoutError = new Error("Request timeout");
      mockFetch.mockRejectedValue(timeoutError);

      await expect(sendEmail(mockFormData)).rejects.toThrow("Request timeout");
    });

    it("handles fetch abort error", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      const abortError = new Error("The operation was aborted");
      abortError.name = "AbortError";
      mockFetch.mockRejectedValue(abortError);

      await expect(sendEmail(mockFormData)).rejects.toThrow(
        "The operation was aborted"
      );
    });

    it("handles JSON stringify error", async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(new Response("OK", { status: 200 }));

      // Create a circular reference to cause JSON.stringify to fail
      const circularFormData = { ...mockFormData };
      (circularFormData as any).circular = circularFormData;

      // Mock JSON.stringify to throw an error
      const originalStringify = JSON.stringify;
      JSON.stringify = jest.fn().mockImplementation(() => {
        throw new Error("Converting circular structure to JSON");
      });

      await expect(sendEmail(circularFormData as any)).rejects.toThrow(
        "Converting circular structure to JSON"
      );

      // Restore original JSON.stringify
      JSON.stringify = originalStringify;
    });
  });
});
