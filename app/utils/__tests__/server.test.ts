// Mock Next.js cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock Supabase SSR
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

import { createClient } from "../server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Get the mocked functions after import
const mockCookies = jest.mocked(cookies);
const mockCreateServerClient = jest.mocked(createServerClient);

// Mock cookie store object with complete interface
const mockCookieStore = {
  getAll: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  has: jest.fn(),
  delete: jest.fn(),
  clear: jest.fn(),
  [Symbol.iterator]: jest.fn(),
  size: 0,
} as any; // Use 'as any' to avoid complex type matching

describe("server utilities", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    process.env = { ...originalEnv };

    // Setup default cookie store mock
    mockCookies.mockResolvedValue(mockCookieStore);
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe("createClient", () => {
    it("should create a Supabase server client with valid environment variables", async () => {
      // Setup environment variables
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      const mockSupabaseClient = { from: jest.fn() };
      mockCreateServerClient.mockReturnValue(mockSupabaseClient);

      const result = await createClient();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockCreateServerClient).toHaveBeenCalledWith(
        "https://test-project.supabase.co",
        "test-anon-key",
        {
          cookies: {
            getAll: expect.any(Function),
            setAll: expect.any(Function),
          },
        }
      );
      expect(result).toBe(mockSupabaseClient);
    });

    it("should throw error when NEXT_PUBLIC_DB_URL is missing", async () => {
      // Remove DB_URL from environment
      delete process.env.NEXT_PUBLIC_DB_URL;
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      await expect(createClient()).rejects.toThrow(
        "NEXT_PUBLIC_DB_URL environment variable is required"
      );

      expect(mockCreateServerClient).not.toHaveBeenCalled();
    });

    it("should throw error when NEXT_PUBLIC_DB_API_ANON_KEY is missing", async () => {
      // Remove ANON_KEY from environment
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      delete process.env.NEXT_PUBLIC_DB_API_ANON_KEY;

      await expect(createClient()).rejects.toThrow(
        "NEXT_PUBLIC_DB_API_ANON_KEY environment variable is required"
      );

      expect(mockCreateServerClient).not.toHaveBeenCalled();
    });

    it("should throw error when both environment variables are missing", async () => {
      // Remove both environment variables
      delete process.env.NEXT_PUBLIC_DB_URL;
      delete process.env.NEXT_PUBLIC_DB_API_ANON_KEY;

      // Should throw for the first missing variable (DB_URL)
      await expect(createClient()).rejects.toThrow(
        "NEXT_PUBLIC_DB_URL environment variable is required"
      );

      expect(mockCreateServerClient).not.toHaveBeenCalled();
    });

    it("should throw error when NEXT_PUBLIC_DB_URL is empty string", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      await expect(createClient()).rejects.toThrow(
        "NEXT_PUBLIC_DB_URL environment variable is required"
      );

      expect(mockCreateServerClient).not.toHaveBeenCalled();
    });

    it("should throw error when NEXT_PUBLIC_DB_API_ANON_KEY is empty string", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "";

      await expect(createClient()).rejects.toThrow(
        "NEXT_PUBLIC_DB_API_ANON_KEY environment variable is required"
      );

      expect(mockCreateServerClient).not.toHaveBeenCalled();
    });

    it("should handle cookies().getAll() correctly", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      const mockCookieData = [
        { name: "session", value: "abc123", options: {} },
        { name: "theme", value: "dark", options: {} },
      ];

      mockCookieStore.getAll.mockReturnValue(mockCookieData);
      mockCreateServerClient.mockReturnValue({ from: jest.fn() });

      await createClient();

      // Get the cookies configuration that was passed to createServerClient
      const cookiesConfig = mockCreateServerClient.mock.calls[0]?.[2]?.cookies;

      // Ensure cookiesConfig exists
      expect(cookiesConfig).toBeDefined();
      expect(cookiesConfig.getAll).toBeDefined();

      // Test the getAll function
      const result = await cookiesConfig.getAll();

      expect(mockCookies).toHaveBeenCalled();
      expect(result).toBe(mockCookieData);
    });

    it("should handle cookies().setAll() correctly", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      mockCreateServerClient.mockReturnValue({ from: jest.fn() });

      await createClient();

      // Get the cookies configuration that was passed to createServerClient
      const cookiesConfig = mockCreateServerClient.mock.calls[0]?.[2]?.cookies;

      // Ensure cookiesConfig exists and has the required methods
      expect(cookiesConfig).toBeDefined();
      expect(cookiesConfig?.setAll).toBeDefined();

      const cookiesToSet = [
        { name: "session", value: "new-session", options: { httpOnly: true } },
        { name: "theme", value: "light", options: { maxAge: 3600 } },
      ];

      // Test the setAll function with non-null assertion
      await cookiesConfig?.setAll?.(cookiesToSet);

      // setAll doesn't call cookies() again - it uses the existing cookieStore promise
      // So we should only check that the cookie.set methods were called correctly
      expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "session",
        "new-session",
        { httpOnly: true }
      );
      expect(mockCookieStore.set).toHaveBeenCalledWith("theme", "light", {
        maxAge: 3600,
      });
    });

    it("should handle empty cookies array in setAll", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      mockCreateServerClient.mockReturnValue({ from: jest.fn() });

      await createClient();

      // Get the cookies configuration
      const cookiesConfig = mockCreateServerClient.mock.calls[0]?.[2]?.cookies;

      // Ensure cookiesConfig exists and has the required methods
      expect(cookiesConfig).toBeDefined();
      expect(cookiesConfig?.setAll).toBeDefined();

      // Test setAll with empty array using non-null assertion
      await cookiesConfig?.setAll?.([]);

      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it("should handle cookies() promise rejection", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      const cookieError = new Error("Cookie access failed");
      mockCookies.mockRejectedValue(cookieError);

      const mockSupabaseClient = { from: jest.fn() };
      mockCreateServerClient.mockReturnValue(mockSupabaseClient);

      // The function should still create the client, but cookie operations will fail
      const result = await createClient();

      expect(result).toBe(mockSupabaseClient);
      expect(mockCreateServerClient).toHaveBeenCalled();

      // Get the cookies configuration
      const cookiesConfig = mockCreateServerClient.mock.calls[0]?.[2]?.cookies;

      // Ensure cookiesConfig exists and has the required methods
      expect(cookiesConfig).toBeDefined();
      expect(cookiesConfig?.getAll).toBeDefined();

      // Test that getAll propagates the error using non-null assertion
      await expect(cookiesConfig?.getAll?.()).rejects.toThrow(
        "Cookie access failed"
      );
    });

    it("should handle createServerClient throwing an error", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      const supabaseError = new Error("Supabase client creation failed");
      mockCreateServerClient.mockImplementation(() => {
        throw supabaseError;
      });

      await expect(createClient()).rejects.toThrow(
        "Supabase client creation failed"
      );
    });

    it("should work with different valid URL formats", async () => {
      const testCases = [
        "https://test.supabase.co",
        "https://my-project-123.supabase.co",
        "https://localhost:3000",
        "http://localhost:54321",
      ];

      for (const url of testCases) {
        jest.clearAllMocks();

        process.env.NEXT_PUBLIC_DB_URL = url;
        process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-key";

        const mockClient = { from: jest.fn() };
        mockCreateServerClient.mockReturnValue(mockClient);

        const result = await createClient();

        expect(mockCreateServerClient).toHaveBeenCalledWith(
          url,
          "test-key",
          expect.any(Object)
        );
        expect(result).toBe(mockClient);
      }
    });

    it("should work with different valid API keys", async () => {
      const testKeys = [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test",
        "sk_test_123456789",
        "anon-key-123",
        "very-long-api-key-with-special-chars_123-456.789",
      ];

      for (const key of testKeys) {
        jest.clearAllMocks();

        process.env.NEXT_PUBLIC_DB_URL = "https://test.supabase.co";
        process.env.NEXT_PUBLIC_DB_API_ANON_KEY = key;

        const mockClient = { from: jest.fn() };
        mockCreateServerClient.mockReturnValue(mockClient);

        const result = await createClient();

        expect(mockCreateServerClient).toHaveBeenCalledWith(
          "https://test.supabase.co",
          key,
          expect.any(Object)
        );
        expect(result).toBe(mockClient);
      }
    });

    it("should handle cookie options correctly in setAll", async () => {
      process.env.NEXT_PUBLIC_DB_URL = "https://test-project.supabase.co";
      process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-anon-key";

      mockCreateServerClient.mockReturnValue({ from: jest.fn() });

      await createClient();

      const cookiesConfig = mockCreateServerClient.mock.calls[0]?.[2]?.cookies;

      // Ensure cookiesConfig exists and has the required methods
      expect(cookiesConfig).toBeDefined();
      expect(cookiesConfig?.setAll).toBeDefined();

      const cookiesToSet = [
        {
          name: "session",
          value: "session-value",
          options: {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 3600,
            path: "/",
          },
        },
        { name: "simple", value: "simple-value", options: {} },
        {
          name: "no-options",
          value: "no-options-value",
          options: undefined as any,
        },
      ];

      await cookiesConfig?.setAll?.(cookiesToSet);

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "session",
        "session-value",
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        }
      );
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "simple",
        "simple-value",
        {}
      );
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "no-options",
        "no-options-value",
        undefined
      );
    });
  });
});
