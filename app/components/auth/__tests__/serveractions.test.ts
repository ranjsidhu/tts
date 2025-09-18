import { signOutAction, getUserDetails } from "../serveractions";

// Mock the auth module
jest.mock("@/auth", () => ({
  signOut: jest.fn(),
}));

// Mock prisma
jest.mock("@/app/api/utils/prismaUtils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
    },
  },
}));

describe("serveractions", () => {
  const mockSignOut = require("@/auth").signOut;
  const mockPrisma = require("@/app/api/utils/prismaUtils").prisma;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signOutAction", () => {
    it("calls signOut from auth module", async () => {
      mockSignOut.mockResolvedValue(undefined);

      await signOutAction();

      expect(mockSignOut).toHaveBeenCalledTimes(1);
      expect(mockSignOut).toHaveBeenCalledWith();
    });

    it("handles signOut throwing an error", async () => {
      const error = new Error("Sign out failed");
      mockSignOut.mockRejectedValue(error);

      await expect(signOutAction()).rejects.toThrow("Sign out failed");
    });

    it("handles signOut timeout", async () => {
      const timeoutError = new Error("Request timeout");
      mockSignOut.mockRejectedValue(timeoutError);

      await expect(signOutAction()).rejects.toThrow("Request timeout");
    });

    it("handles signOut network error", async () => {
      const networkError = new Error("Network error");
      mockSignOut.mockRejectedValue(networkError);

      await expect(signOutAction()).rejects.toThrow("Network error");
    });
  });

  describe("getUserDetails", () => {
    const mockUserDetails = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      dob: new Date("1990-01-01"),
      phone: "07123456789",
      email: "john.doe@example.com",
      first_line_address: "123 Main Street",
      city: "London",
      town: "London",
      postcode: "SW1A 1AA",
      roles: {
        id: 1,
        name: "Admin",
      },
    };

    describe("when email is provided", () => {
      it("returns user details for valid email", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        const result = await getUserDetails("john.doe@example.com");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "john.doe@example.com" },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            dob: true,
            phone: true,
            email: true,
            first_line_address: true,
            city: true,
            town: true,
            postcode: true,
            roles: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        expect(result).toEqual(mockUserDetails);
      });

      it("returns null when user is not found", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(null);

        const result = await getUserDetails("nonexistent@example.com");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "nonexistent@example.com" },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            dob: true,
            phone: true,
            email: true,
            first_line_address: true,
            city: true,
            town: true,
            postcode: true,
            roles: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        expect(result).toBeNull();
      });

      it("handles database connection error", async () => {
        const dbError = new Error("Database connection failed");
        mockPrisma.users.findUnique.mockRejectedValue(dbError);

        await expect(getUserDetails("john.doe@example.com")).rejects.toThrow(
          "Database connection failed"
        );
      });

      it("handles database query timeout", async () => {
        const timeoutError = new Error("Query timeout");
        mockPrisma.users.findUnique.mockRejectedValue(timeoutError);

        await expect(getUserDetails("john.doe@example.com")).rejects.toThrow(
          "Query timeout"
        );
      });

      it("handles database constraint violation", async () => {
        const constraintError = new Error("Unique constraint failed");
        mockPrisma.users.findUnique.mockRejectedValue(constraintError);

        await expect(getUserDetails("john.doe@example.com")).rejects.toThrow(
          "Unique constraint failed"
        );
      });

      it("handles prisma client error", async () => {
        const prismaError = new Error("Prisma client error");
        mockPrisma.users.findUnique.mockRejectedValue(prismaError);

        await expect(getUserDetails("john.doe@example.com")).rejects.toThrow(
          "Prisma client error"
        );
      });

      it("handles empty string email", async () => {
        const result = await getUserDetails("");

        // Empty string is falsy, so it should return null without calling database
        expect(mockPrisma.users.findUnique).not.toHaveBeenCalled();
        expect(result).toBeNull();
      });

      it("handles user with no role", async () => {
        const userWithoutRole = {
          ...mockUserDetails,
          roles: null,
        };
        mockPrisma.users.findUnique.mockResolvedValue(userWithoutRole);

        const result = await getUserDetails("john.doe@example.com");

        expect(result).toEqual(userWithoutRole);
      });

      it("handles user with partial data", async () => {
        const partialUser = {
          id: 1,
          first_name: "John",
          last_name: null,
          dob: null,
          phone: null,
          email: "john.doe@example.com",
          first_line_address: null,
          city: null,
          town: null,
          postcode: null,
          roles: {
            id: 1,
            name: "User",
          },
        };
        mockPrisma.users.findUnique.mockResolvedValue(partialUser);

        const result = await getUserDetails("john.doe@example.com");

        expect(result).toEqual(partialUser);
      });

      it("handles special characters in email", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        const result = await getUserDetails("test+tag@example.co.uk");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "test+tag@example.co.uk" },
          select: expect.any(Object),
        });
        expect(result).toEqual(mockUserDetails);
      });

      it("handles very long email", async () => {
        const longEmail = `${"a".repeat(100)}@example.com`;
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        const result = await getUserDetails(longEmail);

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: longEmail },
          select: expect.any(Object),
        });
        expect(result).toEqual(mockUserDetails);
      });
    });

    describe("when email is null or undefined", () => {
      it("returns null when email is null", async () => {
        const result = await getUserDetails(null);

        expect(mockPrisma.users.findUnique).not.toHaveBeenCalled();
        expect(result).toBeNull();
      });

      it("returns null when email is undefined", async () => {
        const result = await getUserDetails(undefined);

        expect(mockPrisma.users.findUnique).not.toHaveBeenCalled();
        expect(result).toBeNull();
      });
    });

    describe("edge cases", () => {
      it("handles email with only whitespace", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(null);

        const result = await getUserDetails("   ");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "   " },
          select: expect.any(Object),
        });
        expect(result).toBeNull();
      });

      it("handles email with newlines and tabs", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(null);

        const result = await getUserDetails("test@example.com\n\t");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "test@example.com\n\t" },
          select: expect.any(Object),
        });
        expect(result).toBeNull();
      });

      it("handles email with unicode characters", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        const result = await getUserDetails("tëst@ëxämplé.com");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "tëst@ëxämplé.com" },
          select: expect.any(Object),
        });
        expect(result).toEqual(mockUserDetails);
      });

      it("handles email with multiple @ symbols", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(null);

        const result = await getUserDetails("test@@example.com");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "test@@example.com" },
          select: expect.any(Object),
        });
        expect(result).toBeNull();
      });
    });

    describe("database query structure", () => {
      it("uses correct select fields", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        await getUserDetails("test@example.com");

        expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({
          where: { email: "test@example.com" },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            dob: true,
            phone: true,
            email: true,
            first_line_address: true,
            city: true,
            town: true,
            postcode: true,
            roles: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      });

      it("uses correct where clause", async () => {
        mockPrisma.users.findUnique.mockResolvedValue(mockUserDetails);

        await getUserDetails("test@example.com");

        const callArgs = mockPrisma.users.findUnique.mock.calls[0][0];
        expect(callArgs.where).toEqual({ email: "test@example.com" });
      });
    });
  });
});
