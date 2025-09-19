// Mock the session module
jest.mock("../session", () => ({
  getSession: jest.fn(),
}));

import { getUserId, getUserEmail } from "../storage";
import { getSession } from "../session";

// Get the mocked getSession function
const mockGetSession = getSession as unknown as jest.MockedFunction<
  () => Promise<any>
>;

// Mock console.error
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("storage utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe("getUserId", () => {
    it("should return user ID when session exists with valid user", async () => {
      const mockSession = {
        user: {
          id: "12345",
          email: "test@example.com",
          name: "Test User",
        },
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserId();

      expect(mockGetSession).toHaveBeenCalledTimes(1);
      expect(result).toBe("12345");
    });

    it("should return undefined when session exists but user has no id", async () => {
      const mockSession = {
        user: {
          email: "test@example.com",
          name: "Test User",
          // id is missing
        },
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserId();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session exists but user is undefined", async () => {
      const mockSession = {
        expires: "2024-12-31T23:59:59Z",
        // user is missing
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserId();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session exists but user is null", async () => {
      const mockSession = {
        user: null,
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserId();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session is null", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await getUserId();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session is undefined", async () => {
      mockGetSession.mockResolvedValue(undefined);

      const result = await getUserId();

      expect(result).toBeUndefined();
    });

    it("should return null and log error when getSession throws an error", async () => {
      const sessionError = new Error("Session retrieval failed");
      mockGetSession.mockRejectedValue(sessionError);

      const result = await getUserId();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(sessionError);
      expect(mockGetSession).toHaveBeenCalledTimes(1);
    });

    it("should return null and log error when getSession throws a network error", async () => {
      const networkError = new Error("Network request failed");
      mockGetSession.mockRejectedValue(networkError);

      const result = await getUserId();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(networkError);
    });

    it("should return null and log error when getSession throws a timeout error", async () => {
      const timeoutError = new Error("Request timeout");
      mockGetSession.mockRejectedValue(timeoutError);

      const result = await getUserId();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(timeoutError);
    });

    it("should handle user ID with different types", async () => {
      const testCases = [
        { id: "string-id-123", expected: "string-id-123" },
        { id: 12345, expected: 12345 },
        { id: "", expected: "" },
        { id: 0, expected: 0 },
        { id: false, expected: false },
        { id: null, expected: null },
      ];

      for (const testCase of testCases) {
        jest.clearAllMocks();

        const mockSession = {
          user: { id: testCase.id },
          expires: "2024-12-31T23:59:59Z",
        };

        mockGetSession.mockResolvedValue(mockSession);

        const result = await getUserId();

        expect(result).toBe(testCase.expected);
      }
    });

    it("should handle multiple consecutive calls", async () => {
      const mockSession1 = { user: { id: "user1" } };
      const mockSession2 = { user: { id: "user2" } };
      const mockSession3 = { user: { id: "user3" } };

      mockGetSession
        .mockResolvedValueOnce(mockSession1)
        .mockResolvedValueOnce(mockSession2)
        .mockResolvedValueOnce(mockSession3);

      const result1 = await getUserId();
      const result2 = await getUserId();
      const result3 = await getUserId();

      expect(mockGetSession).toHaveBeenCalledTimes(3);
      expect(result1).toBe("user1");
      expect(result2).toBe("user2");
      expect(result3).toBe("user3");
    });

    it("should handle concurrent calls", async () => {
      const mockSession = { user: { id: "concurrent-user" } };
      mockGetSession.mockResolvedValue(mockSession);

      const promises = [getUserId(), getUserId(), getUserId()];
      const results = await Promise.all(promises);

      expect(mockGetSession).toHaveBeenCalledTimes(3);
      results.forEach((result) => {
        expect(result).toBe("concurrent-user");
      });
    });
  });

  describe("getUserEmail", () => {
    it("should return user email when session exists with valid user", async () => {
      const mockSession = {
        user: {
          id: "12345",
          email: "test@example.com",
          name: "Test User",
        },
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserEmail();

      expect(mockGetSession).toHaveBeenCalledTimes(1);
      expect(result).toBe("test@example.com");
    });

    it("should return undefined when session exists but user has no email", async () => {
      const mockSession = {
        user: {
          id: "12345",
          name: "Test User",
          // email is missing
        },
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserEmail();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session exists but user is undefined", async () => {
      const mockSession = {
        expires: "2024-12-31T23:59:59Z",
        // user is missing
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserEmail();

      expect(result).toBeUndefined();
    });

    it("should return undefined when session exists but user is null", async () => {
      const mockSession = {
        user: null,
        expires: "2024-12-31T23:59:59Z",
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserEmail();

      expect(result).toBeUndefined();
    });

    it("should return null when session is null", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await getUserEmail();

      expect(result).toBeNull();
    });

    it("should return null when session is undefined", async () => {
      mockGetSession.mockResolvedValue(undefined);

      const result = await getUserEmail();

      expect(result).toBeNull();
    });

    it("should return null and log error when getSession throws an error", async () => {
      const sessionError = new Error("Session retrieval failed");
      mockGetSession.mockRejectedValue(sessionError);

      const result = await getUserEmail();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(sessionError);
      expect(mockGetSession).toHaveBeenCalledTimes(1);
    });

    it("should return null and log error when getSession throws a network error", async () => {
      const networkError = new Error("Network request failed");
      mockGetSession.mockRejectedValue(networkError);

      const result = await getUserEmail();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(networkError);
    });

    it("should return null and log error when getSession throws a timeout error", async () => {
      const timeoutError = new Error("Request timeout");
      mockGetSession.mockRejectedValue(timeoutError);

      const result = await getUserEmail();

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(timeoutError);
    });

    it("should handle different email formats", async () => {
      const emailTestCases = [
        "simple@example.com",
        "user+tag@example.com",
        "user.name@example.com",
        "user_name@example.com",
        "user-name@example.com",
        "user@subdomain.example.com",
        "user@example-domain.com",
        "very.long.email.address@very.long.domain.name.com",
        "",
        null,
      ];

      for (const email of emailTestCases) {
        jest.clearAllMocks();

        const mockSession = {
          user: { id: "test", email },
          expires: "2024-12-31T23:59:59Z",
        };

        mockGetSession.mockResolvedValue(mockSession);

        const result = await getUserEmail();

        expect(result).toBe(email);
      }
    });

    it("should handle multiple consecutive calls", async () => {
      const mockSession1 = { user: { email: "user1@example.com" } };
      const mockSession2 = { user: { email: "user2@example.com" } };
      const mockSession3 = { user: { email: "user3@example.com" } };

      mockGetSession
        .mockResolvedValueOnce(mockSession1)
        .mockResolvedValueOnce(mockSession2)
        .mockResolvedValueOnce(mockSession3);

      const result1 = await getUserEmail();
      const result2 = await getUserEmail();
      const result3 = await getUserEmail();

      expect(mockGetSession).toHaveBeenCalledTimes(3);
      expect(result1).toBe("user1@example.com");
      expect(result2).toBe("user2@example.com");
      expect(result3).toBe("user3@example.com");
    });

    it("should handle concurrent calls", async () => {
      const mockSession = { user: { email: "concurrent@example.com" } };
      mockGetSession.mockResolvedValue(mockSession);

      const promises = [getUserEmail(), getUserEmail(), getUserEmail()];
      const results = await Promise.all(promises);

      expect(mockGetSession).toHaveBeenCalledTimes(3);
      results.forEach((result) => {
        expect(result).toBe("concurrent@example.com");
      });
    });
  });

  describe("Comparison between getUserId and getUserEmail", () => {
    it("should handle session differently for null session", async () => {
      mockGetSession.mockResolvedValue(null);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      // getUserId returns undefined for null session (due to optional chaining)
      expect(idResult).toBeUndefined();
      // getUserEmail explicitly checks for null session and returns null
      expect(emailResult).toBeNull();
    });

    it("should handle session differently for undefined session", async () => {
      mockGetSession.mockResolvedValue(undefined);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      // getUserId returns undefined for undefined session (due to optional chaining)
      expect(idResult).toBeUndefined();
      // getUserEmail explicitly checks for falsy session and returns null
      expect(emailResult).toBeNull();
    });

    it("should both handle missing user the same way", async () => {
      const mockSession = {
        expires: "2024-12-31T23:59:59Z",
        // user is missing
      };

      mockGetSession.mockResolvedValue(mockSession);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      // Both should return undefined when accessing properties on undefined user
      expect(idResult).toBeUndefined();
      expect(emailResult).toBeUndefined();
    });

    it("should both handle errors the same way", async () => {
      const error = new Error("Session error");
      mockGetSession.mockRejectedValue(error);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      // Both should return null on error
      expect(idResult).toBeNull();
      expect(emailResult).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledTimes(2);
      expect(mockConsoleError).toHaveBeenNthCalledWith(1, error);
      expect(mockConsoleError).toHaveBeenNthCalledWith(2, error);
    });
  });

  describe("Edge cases", () => {
    it("should handle very long user IDs and emails", async () => {
      const longId = "a".repeat(1000);
      const longEmail = `${"a".repeat(64)}@${"b".repeat(63)}.com`;

      const mockSession = {
        user: {
          id: longId,
          email: longEmail,
        },
      };

      mockGetSession.mockResolvedValue(mockSession);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      expect(idResult).toBe(longId);
      expect(emailResult).toBe(longEmail);
    });

    it("should handle special characters in user data", async () => {
      const specialId = "user-123_test@domain";
      const unicodeEmail = "tëst@éxàmplé.com";

      const mockSession = {
        user: {
          id: specialId,
          email: unicodeEmail,
        },
      };

      mockGetSession.mockResolvedValue(mockSession);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      expect(idResult).toBe(specialId);
      expect(emailResult).toBe(unicodeEmail);
    });

    it("should handle numeric user IDs", async () => {
      const numericId = 98765;

      const mockSession = {
        user: {
          id: numericId,
          email: "numeric@example.com",
        },
      };

      mockGetSession.mockResolvedValue(mockSession);

      const result = await getUserId();

      expect(result).toBe(numericId);
    });

    it("should maintain referential integrity", async () => {
      const userObject = {
        id: "ref-test",
        email: "ref@example.com",
      };

      const mockSession = {
        user: userObject,
      };

      mockGetSession.mockResolvedValue(mockSession);

      const idResult = await getUserId();
      const emailResult = await getUserEmail();

      expect(idResult).toBe(userObject.id);
      expect(emailResult).toBe(userObject.email);
    });
  });
});
