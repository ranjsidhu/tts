// Mock dependencies before imports
jest.mock("@/app/api/utils/prismaUtils", () => ({
  prisma: {
    users: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@/app/utils/password", () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));

import { authorizeUsers } from "../authorizeUsers";
import { prisma } from "@/app/api/utils/prismaUtils";
import { hashPassword, verifyPassword } from "@/app/utils/password";

const mockPrismaUsersFindUnique = jest.mocked(prisma.users.findUnique);
const mockPrismaUsersCreate = jest.mocked(prisma.users.create);
const mockHashPassword = jest.mocked(hashPassword);
const mockVerifyPassword = jest.mocked(verifyPassword);

describe("authorizeUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Input validation", () => {
    it("should return null when email is missing", async () => {
      const credentials = {
        password: "password123",
      };

      const result = await authorizeUsers(credentials);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return null when password is missing", async () => {
      const credentials = {
        email: "test@example.com",
      };

      const result = await authorizeUsers(credentials);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return null when both email and password are missing", async () => {
      const credentials = {};

      const result = await authorizeUsers(credentials);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return null when credentials is undefined", async () => {
      const result = await authorizeUsers(undefined as any);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return null when email is empty string", async () => {
      const credentials = {
        email: "",
        password: "password123",
      };

      const result = await authorizeUsers(credentials);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });

    it("should return null when password is empty string", async () => {
      const credentials = {
        email: "test@example.com",
        password: "",
      };

      const result = await authorizeUsers(credentials);

      expect(result).toBeNull();
      expect(mockPrismaUsersFindUnique).not.toHaveBeenCalled();
    });
  });

  describe("Existing user authentication", () => {
    it("should authenticate existing user with valid credentials", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "correctPassword",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: "Doe",
        password: "hashedPassword123",
        role_id: 2,
        roles: { name: "admin" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockResolvedValue(true);

      const result = await authorizeUsers(credentials);

      expect(mockPrismaUsersFindUnique).toHaveBeenCalledWith({
        where: {
          email: "existing@example.com",
        },
        include: {
          roles: true,
        },
      });
      expect(mockVerifyPassword).toHaveBeenCalledWith(
        "correctPassword",
        "hashedPassword123"
      );
      expect(result).toEqual({
        id: "1",
        email: "existing@example.com",
        name: "John Doe",
        role: "admin",
      });
    });

    it("should handle existing user with null last_name", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "correctPassword",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: null,
        password: "hashedPassword123",
        role_id: 2,
        roles: { name: "admin" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockResolvedValue(true);

      const result = await authorizeUsers(credentials);

      expect(result).toEqual({
        id: "1",
        email: "existing@example.com",
        name: "John null",
        role: "admin",
      });
    });

    it("should handle existing user with no role", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "correctPassword",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: "Doe",
        password: "hashedPassword123",
        role_id: 2,
        roles: null,
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockResolvedValue(true);

      const result = await authorizeUsers(credentials);

      expect(result).toEqual({
        id: "1",
        email: "existing@example.com",
        name: "John Doe",
        role: "user",
      });
    });

    it("should return null for existing user with invalid password", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "wrongPassword",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: "Doe",
        password: "hashedPassword123",
        role_id: 2,
        roles: { name: "admin" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockResolvedValue(false);

      const result = await authorizeUsers(credentials);

      expect(mockVerifyPassword).toHaveBeenCalledWith(
        "wrongPassword",
        "hashedPassword123"
      );
      expect(result).toBeNull();
    });
  });

  describe("New user creation", () => {
    it("should create new user when user doesn't exist", async () => {
      const credentials = {
        email: "newuser@example.com",
        password: "newPassword123",
      };

      const mockNewUser = {
        id: 2,
        email: "newuser@example.com",
        first_name: "newuser",
        last_name: null,
        password: "hashedNewPassword",
        role_id: 3,
        roles: { name: "user" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedNewPassword");
      mockPrismaUsersCreate.mockResolvedValue(mockNewUser as any);

      const result = await authorizeUsers(credentials);

      expect(mockPrismaUsersFindUnique).toHaveBeenCalledWith({
        where: {
          email: "newuser@example.com",
        },
        include: {
          roles: true,
        },
      });
      expect(mockHashPassword).toHaveBeenCalledWith("newPassword123");
      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "newuser@example.com",
          first_name: "newuser",
          password: "hashedNewPassword",
          role_id: 3,
        },
        include: {
          roles: true,
        },
      });
      expect(result).toEqual({
        id: "2",
        email: "newuser@example.com",
        name: "newuser null",
        role: "user",
      });
    });

    it("should create new user with complex email (extract first name correctly)", async () => {
      const credentials = {
        email: "john.doe+test@company.com",
        password: "newPassword123",
      };

      const mockNewUser = {
        id: 3,
        email: "john.doe+test@company.com",
        first_name: "john.doe+test",
        last_name: null,
        password: "hashedNewPassword",
        role_id: 3,
        roles: { name: "user" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedNewPassword");
      mockPrismaUsersCreate.mockResolvedValue(mockNewUser as any);

      const result = await authorizeUsers(credentials);

      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "john.doe+test@company.com",
          first_name: "john.doe+test",
          password: "hashedNewPassword",
          role_id: 3,
        },
        include: {
          roles: true,
        },
      });
      expect(result).toEqual({
        id: "3",
        email: "john.doe+test@company.com",
        name: "john.doe+test null",
        role: "user",
      });
    });

    it("should create new user with no role", async () => {
      const credentials = {
        email: "newuser@example.com",
        password: "newPassword123",
      };

      const mockNewUser = {
        id: 2,
        email: "newuser@example.com",
        first_name: "newuser",
        last_name: null,
        password: "hashedNewPassword",
        role_id: 3,
        roles: null,
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedNewPassword");
      mockPrismaUsersCreate.mockResolvedValue(mockNewUser as any);

      const result = await authorizeUsers(credentials);

      expect(result).toEqual({
        id: "2",
        email: "newuser@example.com",
        name: "newuser null",
        role: "user",
      });
    });
  });

  describe("Error handling", () => {
    it("should handle database error when finding user", async () => {
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      mockPrismaUsersFindUnique.mockRejectedValue(
        new Error("Database connection error")
      );

      await expect(authorizeUsers(credentials)).rejects.toThrow(
        "Database connection error"
      );
    });

    it("should handle error when hashing password", async () => {
      const credentials = {
        email: "newuser@example.com",
        password: "newPassword123",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockRejectedValue(new Error("Hash algorithm error"));

      await expect(authorizeUsers(credentials)).rejects.toThrow(
        "Hash algorithm error"
      );
    });

    it("should handle error when creating new user", async () => {
      const credentials = {
        email: "newuser@example.com",
        password: "newPassword123",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedPassword");
      mockPrismaUsersCreate.mockRejectedValue(
        new Error("User creation failed")
      );

      await expect(authorizeUsers(credentials)).rejects.toThrow(
        "User creation failed"
      );
    });

    it("should handle error when verifying password", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: "Doe",
        password: "hashedPassword123",
        role_id: 2,
        roles: { name: "admin" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockRejectedValue(
        new Error("Password verification error")
      );

      await expect(authorizeUsers(credentials)).rejects.toThrow(
        "Password verification error"
      );
    });

    it("should handle user with null password field", async () => {
      const credentials = {
        email: "existing@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "existing@example.com",
        first_name: "John",
        last_name: "Doe",
        password: null,
        role_id: 2,
        roles: { name: "admin" },
      };

      mockPrismaUsersFindUnique.mockResolvedValue(mockUser as any);
      mockVerifyPassword.mockResolvedValue(false);

      const result = await authorizeUsers(credentials);

      expect(mockVerifyPassword).toHaveBeenCalledWith("password123", null);
      expect(result).toBeNull();
    });
  });

  describe("Type conversion", () => {
    it("should handle string types in credentials correctly", async () => {
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedPassword");

      const mockNewUser = {
        id: 4,
        email: "test@example.com",
        first_name: "test",
        last_name: null,
        password: "hashedPassword",
        role_id: 3,
        roles: { name: "user" },
      };

      mockPrismaUsersCreate.mockResolvedValue(mockNewUser as any);

      const result = await authorizeUsers(credentials);

      expect(mockPrismaUsersFindUnique).toHaveBeenCalledWith({
        where: {
          email: "test@example.com",
        },
        include: {
          roles: true,
        },
      });
      expect(mockHashPassword).toHaveBeenCalledWith("password123");
      expect(result).toEqual({
        id: "4",
        email: "test@example.com",
        name: "test null",
        role: "user",
      });
    });

    it("should handle email with no @ symbol gracefully", async () => {
      const credentials = {
        email: "invalidemail",
        password: "password123",
      };

      mockPrismaUsersFindUnique.mockResolvedValue(null);
      mockHashPassword.mockResolvedValue("hashedPassword");

      const mockNewUser = {
        id: 5,
        email: "invalidemail",
        first_name: "invalidemail",
        last_name: null,
        password: "hashedPassword",
        role_id: 3,
        roles: { name: "user" },
      };

      mockPrismaUsersCreate.mockResolvedValue(mockNewUser as any);

      const result = await authorizeUsers(credentials);

      expect(mockPrismaUsersCreate).toHaveBeenCalledWith({
        data: {
          email: "invalidemail",
          first_name: "invalidemail",
          password: "hashedPassword",
          role_id: 3,
        },
        include: {
          roles: true,
        },
      });
      expect(result).toEqual({
        id: "5",
        email: "invalidemail",
        name: "invalidemail null",
        role: "user",
      });
    });
  });
});
