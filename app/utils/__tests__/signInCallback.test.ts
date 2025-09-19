// Mock Prisma
jest.mock("@/app/api/utils/prismaUtils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { signInCallback } from "../signInCallback";
import { prisma } from "@/app/api/utils/prismaUtils";
import type { User, Account } from "next-auth";

// Get mocked Prisma functions
const mockPrismaUsersFindUnique = jest.mocked(prisma.users.findUnique);
const mockPrismaUsersCreate = jest.mocked(prisma.users.create);
const mockPrismaUsersUpdate = jest.mocked(prisma.users.update);

// Mock console methods
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

describe("signInCallback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
    mockConsoleLog.mockRestore();
  });

  describe("Input validation", () => {
    it("should return false when user has no email", async () => {
      const user: User = {
        id: "1",
        name: "Test User",
        // email is undefined
      };
      const account: Account | null = {
        provider: "google",
        type: "oauth",
        providerAccountId: "123",
      };

      const result = await signInCallback({ user, account });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith("No email provided");
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return false when user email is empty string", async () => {
      const user: User = {
        id: "1",
        name: "Test User",
        email: "",
      };
      const account: Account | null = null;

      const result = await signInCallback({ user, account });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith("No email provided");
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should handle null user", async () => {
      const user: User = null as any;
      const account = null;

      const result = await signInCallback({ user, account });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith("No email provided");
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });
  });

  describe("Existing user flow", () => {
    it("should update last_logged_in for existing user", async () => {
      const user: User = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      };

      const existingUser = {
        id: 1,
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
        roles: { name: "admin" },
      };

      const updatedUser = {
        ...existingUser,
        last_logged_in: new Date(),
      };

      mockPrismaUsersFindUnique.mockResolvedValue(existingUser as any);
      mockPrismaUsersUpdate.mockResolvedValue(updatedUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersFindUnique).toHaveBeenCalledWith({
        where: { email: "john.doe@example.com" },
        include: { roles: true },
      });
      expect(mockPrismaUsersUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { last_logged_in: expect.any(Date) },
      });
      expect(mockConsoleLog).toHaveBeenCalledWith("Existing user found:", {
        id: 1,
        email: "john.doe@example.com",
        role: "admin",
      });
    });

    it("should handle existing user with no role", async () => {
      const user: User = {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
      };

      const existingUser = {
        id: 2,
        email: "jane.smith@example.com",
        first_name: "Jane",
        last_name: "Smith",
        roles: null,
      };

      mockPrismaUsersFindUnique.mockResolvedValue(existingUser as any);
      mockPrismaUsersUpdate.mockResolvedValue(existingUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockConsoleLog).toHaveBeenCalledWith("Existing user found:", {
        id: 2,
        email: "jane.smith@example.com",
        role: undefined,
      });
    });

    it("should handle existing user with undefined roles", async () => {
      const user: User = {
        id: "3",
        name: "Bob Wilson",
        email: "bob.wilson@example.com",
      };

      const existingUser = {
        id: 3,
        email: "bob.wilson@example.com",
        first_name: "Bob",
        last_name: "Wilson",
        roles: undefined,
      };

      mockPrismaUsersFindUnique.mockResolvedValue(existingUser as any);
      mockPrismaUsersUpdate.mockResolvedValue(existingUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockConsoleLog).toHaveBeenCalledWith("Existing user found:", {
        id: 3,
        email: "bob.wilson@example.com",
        role: undefined,
      });
    });
  });

  describe("New user creation flow", () => {
    it("should create new user with parsed name", async () => {
      const user: User = {
        id: "4",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      };

      const newUser = {
        id: 4,
        email: "alice.johnson@example.com",
        first_name: "Alice",
        last_name: "Johnson",
        last_logged_in: new Date(),
        roles: { name: "candidate" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "alice.johnson@example.com",
          first_name: "Alice",
          last_name: "Johnson",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3, // Candidate role ID
            },
          },
        },
        include: {
          roles: true,
        },
      });
      expect(mockConsoleLog).toHaveBeenCalledWith("New user created:", {
        id: 4,
        email: "alice.johnson@example.com",
        role: "candidate",
      });
    });

    it("should create new user with single name", async () => {
      const user: User = {
        id: "5",
        name: "Madonna",
        email: "madonna@example.com",
      };

      const newUser = {
        id: 5,
        email: "madonna@example.com",
        first_name: "Madonna",
        last_name: "",
        roles: { name: "candidate" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "madonna@example.com",
          first_name: "Madonna",
          last_name: "",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should create new user with no name", async () => {
      const user: User = {
        id: "6",
        email: "noname@example.com",
        // name is undefined
      };

      const newUser = {
        id: 6,
        email: "noname@example.com",
        first_name: "",
        last_name: "",
        roles: { name: "candidate" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "noname@example.com",
          first_name: "",
          last_name: "",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should create new user with multiple names", async () => {
      const user: User = {
        id: "7",
        name: "Jean-Claude Van Damme",
        email: "jcvd@example.com",
      };

      const newUser = {
        id: 7,
        email: "jcvd@example.com",
        first_name: "Jean-Claude",
        last_name: "Van",
        roles: { name: "candidate" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "jcvd@example.com",
          first_name: "Jean-Claude",
          last_name: "Van", // Only takes the second part
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should create new user with empty name", async () => {
      const user: User = {
        id: "8",
        name: "",
        email: "empty@example.com",
      };

      const newUser = {
        id: 8,
        email: "empty@example.com",
        first_name: "",
        last_name: "",
        roles: { name: "candidate" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "empty@example.com",
          first_name: "",
          last_name: "",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should create new user with no role", async () => {
      const user: User = {
        id: "9",
        name: "No Role User",
        email: "norole@example.com",
      };

      const newUser = {
        id: 9,
        email: "norole@example.com",
        first_name: "No",
        last_name: "Role",
        roles: null,
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue(newUser as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockConsoleLog).toHaveBeenCalledWith("New user created:", {
        id: 9,
        email: "norole@example.com",
        role: undefined,
      });
    });
  });

  describe("Error handling", () => {
    it("should handle database error when finding user", async () => {
      const user: User = {
        id: "10",
        name: "Error User",
        email: "error@example.com",
      };

      const dbError = new Error("Database connection failed");
      mockPrismaUsersFindUnique.mockRejectedValue(dbError);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error in signInCallback:",
        dbError
      );
    });

    it("should handle database error when updating existing user", async () => {
      const user: User = {
        id: "11",
        name: "Update Error User",
        email: "update.error@example.com",
      };

      const existingUser = {
        id: 11,
        email: "update.error@example.com",
        roles: { name: "admin" },
      };

      const updateError = new Error("Update failed");
      mockPrismaUsersFindUnique.mockResolvedValue(existingUser as any);
      mockPrismaUsersUpdate.mockRejectedValue(updateError);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error in signInCallback:",
        updateError
      );
    });

    it("should handle database error when creating new user", async () => {
      const user: User = {
        id: "12",
        name: "Create Error User",
        email: "create.error@example.com",
      };

      const createError = new Error("User creation failed");
      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockRejectedValue(createError);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error in signInCallback:",
        createError
      );
    });

    it("should handle unexpected errors", async () => {
      const user: User = {
        id: "13",
        name: "Unexpected Error User",
        email: "unexpected@example.com",
      };

      const unexpectedError = new TypeError(
        "Cannot read property of undefined"
      );
      mockPrismaUsersFindUnique.mockImplementation(() => {
        throw unexpectedError;
      });

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(false);
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error in signInCallback:",
        unexpectedError
      );
    });
  });

  describe("Account parameter handling", () => {
    it("should work with null account", async () => {
      const user: User = {
        id: "14",
        name: "Null Account",
        email: "null.account@example.com",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 14,
        email: "null.account@example.com",
        first_name: "Null",
        last_name: "Account",
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
    });

    it("should work with undefined account", async () => {
      const user: User = {
        id: "15",
        name: "Undefined Account",
        email: "undefined.account@example.com",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 15,
        email: "undefined.account@example.com",
        first_name: "Undefined",
        last_name: "Account",
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account: undefined });

      expect(result).toBe(true);
    });

    it("should work with valid account object", async () => {
      const user: User = {
        id: "16",
        name: "Valid Account",
        email: "valid.account@example.com",
      };

      const account: Account = {
        provider: "google",
        type: "oauth",
        providerAccountId: "google-123",
        access_token: "access-token",
        refresh_token: "refresh-token",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 16,
        email: "valid.account@example.com",
        first_name: "Valid",
        last_name: "Account",
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account });

      expect(result).toBe(true);
      // Account parameter is not used in the current implementation
      // but should not affect the result
    });
  });

  describe("Edge cases", () => {
    it("should handle very long names", async () => {
      const longName = `${"A".repeat(100)} ${"B".repeat(100)}`;
      const user: User = {
        id: "17",
        name: longName,
        email: "long.name@example.com",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 17,
        email: "long.name@example.com",
        first_name: "A".repeat(100),
        last_name: "B".repeat(100),
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "long.name@example.com",
          first_name: "A".repeat(100),
          last_name: "B".repeat(100),
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should handle special characters in names", async () => {
      const user: User = {
        id: "18",
        name: "José María-González O'Connor",
        email: "special@example.com",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 18,
        email: "special@example.com",
        first_name: "José",
        last_name: "María-González",
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "special@example.com",
          first_name: "José",
          last_name: "María-González",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });

    it("should handle whitespace-only name", async () => {
      const user: User = {
        id: "19",
        name: "   ",
        email: "whitespace@example.com",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockPrismaUsersCreate.mockResolvedValue({
        id: 19,
        email: "whitespace@example.com",
        first_name: "",
        last_name: "",
        roles: { name: "candidate" },
      } as any);

      const result = await signInCallback({ user, account: null });

      expect(result).toBe(true);
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "whitespace@example.com",
          first_name: "",
          last_name: "",
          last_logged_in: expect.any(Date),
          roles: {
            connect: {
              id: 3,
            },
          },
        },
        include: {
          roles: true,
        },
      });
    });
  });
});
