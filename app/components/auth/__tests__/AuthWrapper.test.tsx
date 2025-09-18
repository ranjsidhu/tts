import AuthWrapper from "../AuthWrapper";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock session utility
jest.mock("@/app/utils/session", () => ({
  getSession: jest.fn(),
}));

// Mock server actions
jest.mock("../serveractions", () => ({
  getUserDetails: jest.fn(),
}));

// Mock the auth module
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

describe("AuthWrapper Component", () => {
  const mockRedirect = require("next/navigation").redirect;
  const mockGetSession = require("@/app/utils/session").getSession;
  const mockGetUserDetails = require("../serveractions").getUserDetails;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("when user is not authenticated", () => {
    it("redirects to sign-in page when session is null", async () => {
      mockGetSession.mockResolvedValue(null);

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockRedirect).toHaveBeenCalledWith("/auth/sign-in");
      expect(mockGetUserDetails).not.toHaveBeenCalled();
    });

    it("redirects to sign-in page when session has no user", async () => {
      mockGetSession.mockResolvedValue({ user: null });

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockRedirect).toHaveBeenCalledWith("/auth/sign-in");
      expect(mockGetUserDetails).not.toHaveBeenCalled();
    });

    it("redirects to sign-in page when session user is undefined", async () => {
      mockGetSession.mockResolvedValue({ user: undefined });

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockRedirect).toHaveBeenCalledWith("/auth/sign-in");
      expect(mockGetUserDetails).not.toHaveBeenCalled();
    });
  });

  describe("when user is authenticated but has no role", () => {
    it("redirects to home page when userDetails is null", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue(null);

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("redirects to home page when userDetails has no roles", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: null,
      });

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("redirects to home page when userDetails roles has no name", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: null },
      });

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("redirects to home page when userDetails roles name is undefined", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: undefined },
      });

      try {
        await AuthWrapper({ children: <div>Protected Content</div> });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });
  });

  describe("when user is authenticated and has valid role", () => {
    it("renders children when no role restriction is specified", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Admin" },
      });

      const result = await AuthWrapper({
        children: <div data-testid="protected-content">Protected Content</div>,
      });

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("renders children when user role matches single role restriction", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Admin" },
      });

      const result = await AuthWrapper({
        children: <div data-testid="protected-content">Protected Content</div>,
        role: "Admin",
      });

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("renders children when user role matches one of multiple role restrictions", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Tutor" },
      });

      const result = await AuthWrapper({
        children: <div data-testid="protected-content">Protected Content</div>,
        role: ["Admin", "Tutor", "Student"],
      });

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  describe("when user role does not match restrictions", () => {
    it("redirects to home page when user role does not match single role restriction", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Student" },
      });

      try {
        await AuthWrapper({
          children: <div>Protected Content</div>,
          role: "Admin",
        });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("redirects to home page when user role does not match any of multiple role restrictions", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Guest" },
      });

      try {
        await AuthWrapper({
          children: <div>Protected Content</div>,
          role: ["Admin", "Tutor", "Student"],
        });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockGetUserDetails).toHaveBeenCalledWith("test@example.com");
      expect(mockRedirect).toHaveBeenCalledWith("/");
    });
  });

  describe("error handling", () => {
    it("handles getSession throwing an error", async () => {
      const error = new Error("Session error");
      mockGetSession.mockRejectedValue(error);

      await expect(
        AuthWrapper({ children: <div>Protected Content</div> })
      ).rejects.toThrow("Session error");
    });

    it("handles getUserDetails throwing an error", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      const error = new Error("Database error");
      mockGetUserDetails.mockRejectedValue(error);

      await expect(
        AuthWrapper({ children: <div>Protected Content</div> })
      ).rejects.toThrow("Database error");
    });
  });

  describe("edge cases", () => {
    it("handles empty string role", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Admin" },
      });

      const result = await AuthWrapper({
        children: <div>Protected Content</div>,
        role: "",
      });

      // Empty string role should not restrict access (falsy value)
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it("handles empty array role", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Admin" },
      });

      try {
        await AuthWrapper({
          children: <div>Protected Content</div>,
          role: [],
        });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("handles case-sensitive role matching", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "admin" }, // lowercase
      });

      try {
        await AuthWrapper({
          children: <div>Protected Content</div>,
          role: "Admin", // uppercase
        });
      } catch (error: any) {
        console.error(error);
        // redirect throws an error, which is expected
      }

      expect(mockRedirect).toHaveBeenCalledWith("/");
    });

    it("handles multiple children", async () => {
      mockGetSession.mockResolvedValue({
        user: { email: "test@example.com" },
      });
      mockGetUserDetails.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        roles: { id: 1, name: "Admin" },
      });

      const result = await AuthWrapper({
        children: (
          <>
            <div data-testid="child1">Child 1</div>
            <div data-testid="child2">Child 2</div>
          </>
        ),
      });

      expect(result).toBeDefined();
    });
  });
});
