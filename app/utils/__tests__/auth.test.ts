// Mock next-auth and other ES modules before any imports
jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next-auth/providers/credentials", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock dependencies
jest.mock("../session", () => ({
  getSession: jest.fn(),
}));

jest.mock("../../api/utils/prismaUtils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("../config", () => ({
  config: {
    adminRoleName: "admin",
    tutorRoleName: "tutor",
  },
}));

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      body: JSON.stringify(body),
      status: init?.status || 200,
      headers: init?.headers || {},
    })),
  },
}));

import { NextResponse } from "next/server";
import {
  checkAdminAccess,
  checkTutorAccess,
  checkAdminOrTutorAccess,
  removeUndefined,
  validateUserIdMatch,
} from "../auth";
import { getSession } from "../session";
import { prisma } from "../../api/utils/prismaUtils";

// Type for mocked session data
type MockedSession = {
  user?: {
    email?: string;
    [key: string]: any;
  };
  expires?: string;
  [key: string]: any;
} | null;

const mockGetSession = getSession as jest.MockedFunction<
  () => Promise<MockedSession>
>;
const mockPrismaUsersFindUnique = jest.mocked(prisma.users.findUnique);
const mockNextResponseJson = NextResponse.json as jest.MockedFunction<
  typeof NextResponse.json
>;

describe("auth.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAuthenticatedUser (internal function tested through public functions)", () => {
    describe("checkAdminAccess", () => {
      it("should return unauthorized when no session exists", async () => {
        mockGetSession.mockResolvedValue(null);

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(result.user).toBeUndefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: No session found" },
          { status: 401 }
        );
      });

      it("should return unauthorized when session has no email", async () => {
        mockGetSession.mockResolvedValue({ user: {} });

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: No session found" },
          { status: 401 }
        );
      });

      it("should return unauthorized when user is not found in database", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "test@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue(null);

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: User not found or has no role" },
          { status: 401 }
        );
      });

      it("should return unauthorized when user has no role", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "test@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 1,
          roles: null,
        } as any);

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: User not found or has no role" },
          { status: 401 }
        );
      });

      it("should return unauthorized when user role is not admin", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "test@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 1,
          roles: { name: "user" },
        } as any);

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: admin access required" },
          { status: 403 }
        );
      });

      it("should return authorized when user is admin", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "admin@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 1,
          roles: { name: "admin" },
        } as any);

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(true);
        expect(result.response).toBeNull();
        expect(result.user).toEqual({ id: 1, role: "admin" });
      });

      it("should handle database errors gracefully", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "test@example.com" },
        });
        mockPrismaUsersFindUnique.mockRejectedValue(
          new Error("Database error")
        );

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Internal server error" },
          { status: 500 }
        );
      });

      it("should handle session errors gracefully", async () => {
        mockGetSession.mockRejectedValue(new Error("Session error"));

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Internal server error" },
          { status: 500 }
        );
      });

      it("should handle errors in checkUserRole function when role comparison fails", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "admin@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 1,
          roles: { name: "admin" },
        } as any);

        // Mock the includes method to throw an error during role checking
        const mockIncludes = jest
          .spyOn(Array.prototype, "includes")
          .mockImplementation(() => {
            throw new Error("Array comparison error");
          });

        const result = await checkAdminAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Internal server error" },
          { status: 500 }
        );

        // Restore the original includes method
        mockIncludes.mockRestore();
      });
    });

    describe("checkTutorAccess", () => {
      it("should return authorized when user is tutor", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "tutor@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 2,
          roles: { name: "tutor" },
        } as any);

        const result = await checkTutorAccess();

        expect(result.isAuthorized).toBe(true);
        expect(result.response).toBeNull();
        expect(result.user).toEqual({ id: 2, role: "tutor" });
      });

      it("should return unauthorized when user is not tutor", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "user@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 3,
          roles: { name: "user" },
        } as any);

        const result = await checkTutorAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: tutor access required" },
          { status: 403 }
        );
      });
    });

    describe("checkAdminOrTutorAccess", () => {
      it("should return authorized when user is admin", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "admin@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 1,
          roles: { name: "admin" },
        } as any);

        const result = await checkAdminOrTutorAccess();

        expect(result.isAuthorized).toBe(true);
        expect(result.response).toBeNull();
        expect(result.user).toEqual({ id: 1, role: "admin" });
      });

      it("should return authorized when user is tutor", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "tutor@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 2,
          roles: { name: "tutor" },
        } as any);

        const result = await checkAdminOrTutorAccess();

        expect(result.isAuthorized).toBe(true);
        expect(result.response).toBeNull();
        expect(result.user).toEqual({ id: 2, role: "tutor" });
      });

      it("should return unauthorized when user is neither admin nor tutor", async () => {
        mockGetSession.mockResolvedValue({
          user: { email: "user@example.com" },
        });
        mockPrismaUsersFindUnique.mockResolvedValue({
          id: 3,
          roles: { name: "user" },
        } as any);

        const result = await checkAdminOrTutorAccess();

        expect(result.isAuthorized).toBe(false);
        expect(result.response).toBeDefined();
        expect(mockNextResponseJson).toHaveBeenCalledWith(
          { error: "Unauthorized: admin or tutor access required" },
          { status: 403 }
        );
      });
    });
  });

  describe("removeUndefined", () => {
    it("should remove undefined values", () => {
      const input = {
        a: "value",
        b: undefined,
        c: "another value",
      };

      const result = removeUndefined(input);

      expect(result).toEqual({
        a: "value",
        c: "another value",
      });
    });

    it("should remove null values", () => {
      const input = {
        a: "value",
        b: null,
        c: "another value",
      };

      const result = removeUndefined(input);

      expect(result).toEqual({
        a: "value",
        c: "another value",
      });
    });

    it("should remove empty string values", () => {
      const input = {
        a: "value",
        b: "",
        c: "another value",
      };

      const result = removeUndefined(input);

      expect(result).toEqual({
        a: "value",
        c: "another value",
      });
    });

    it("should keep falsy values that are not undefined, null, or empty string", () => {
      const input = {
        a: 0,
        b: false,
        c: undefined,
        d: null,
        e: "",
        f: "value",
      };

      const result = removeUndefined(input);

      expect(result).toEqual({
        a: 0,
        b: false,
        f: "value",
      });
    });

    it("should handle empty object", () => {
      const result = removeUndefined({});
      expect(result).toEqual({});
    });
  });

  describe("validateUserIdMatch", () => {
    beforeEach(() => {
      // Reset mocks for each test in this describe block
      jest.clearAllMocks();
    });

    it("should return unauthorized when user is not authenticated", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await validateUserIdMatch("123");

      expect(result.isAuthorized).toBe(false);
      expect(result.response).toBeDefined();
      expect(result.userId).toBeUndefined();
      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Unauthorized: No session found" },
        { status: 401 }
      );
    });

    it("should return error when userId parameter is undefined", async () => {
      mockGetSession.mockResolvedValue({ user: { email: "test@example.com" } });
      mockPrismaUsersFindUnique.mockResolvedValue({
        id: 1,
        roles: { name: "user" },
      } as any);

      const result = await validateUserIdMatch(undefined);

      expect(result.isAuthorized).toBe(false);
      expect(result.response).toBeDefined();
      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "User ID parameter is required" },
        { status: 400 }
      );
    });

    it("should return unauthorized when userId does not match session user id", async () => {
      mockGetSession.mockResolvedValue({ user: { email: "test@example.com" } });
      mockPrismaUsersFindUnique.mockResolvedValue({
        id: 1,
        roles: { name: "user" },
      } as any);

      const result = await validateUserIdMatch("999");

      expect(result.isAuthorized).toBe(false);
      expect(result.response).toBeDefined();
      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Unauthorized: User ID does not match session" },
        { status: 403 }
      );
    });

    it("should return authorized when userId matches session user id", async () => {
      mockGetSession.mockResolvedValue({ user: { email: "test@example.com" } });
      mockPrismaUsersFindUnique.mockResolvedValue({
        id: 123,
        roles: { name: "user" },
      } as any);

      const result = await validateUserIdMatch("123");

      expect(result.isAuthorized).toBe(true);
      expect(result.response).toBeNull();
      expect(result.userId).toBe(123);
    });

    it("should handle string userId conversion correctly", async () => {
      mockGetSession.mockResolvedValue({ user: { email: "test@example.com" } });
      mockPrismaUsersFindUnique.mockResolvedValue({
        id: 456,
        roles: { name: "admin" },
      } as any);

      const result = await validateUserIdMatch("456");

      expect(result.isAuthorized).toBe(true);
      expect(result.response).toBeNull();
      expect(result.userId).toBe(456);
    });

    it("should handle database errors gracefully", async () => {
      mockGetSession.mockResolvedValue({ user: { email: "test@example.com" } });
      mockPrismaUsersFindUnique.mockRejectedValue(new Error("Database error"));

      const result = await validateUserIdMatch("123");

      expect(result.isAuthorized).toBe(false);
      expect(result.response).toBeDefined();
      expect(mockNextResponseJson).toHaveBeenCalledWith(
        { error: "Internal server error" },
        { status: 500 }
      );
    });
  });
});
