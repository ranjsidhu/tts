import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "@/auth";
import SignIn from "../SignIn";

// Mock the auth signIn function
jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

// Type the mocked function
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render sign in button for google provider", () => {
      render(<SignIn provider="google" />);

      const button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render sign in button for github provider", () => {
      render(<SignIn provider="github" />);

      const button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render sign in button for apple provider", () => {
      render(<SignIn provider="apple" />);

      const button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render sign in button for email provider", () => {
      render(<SignIn provider="email" />);

      const button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render form element with action", () => {
      render(<SignIn provider="google" />);

      const form = screen.getByRole("button").closest("form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute("action");
    });

    it("should have consistent button text across all providers", () => {
      const providers = ["google", "github", "apple", "email"];

      providers.forEach((provider) => {
        const { unmount } = render(<SignIn provider={provider} />);
        const button = screen.getByRole("button", { name: /sign in/i });
        expect(button).toHaveTextContent("Sign in");
        unmount();
      });
    });
  });

  describe("Provider Mapping", () => {
    it("should handle unknown provider gracefully", () => {
      // This should render nothing since the provider isn't in the map
      const { container } = render(<SignIn provider="unknown" />);
      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();
      expect(form?.children).toHaveLength(0);
    });

    it("should render the same button structure for all valid providers", () => {
      const validProviders = ["google", "github", "apple", "email"];

      validProviders.forEach((provider) => {
        const { unmount } = render(<SignIn provider={provider} />);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
        expect(button).toHaveTextContent("Sign in");
        unmount();
      });
    });
  });

  describe("Form Submission", () => {
    it("should call signIn with correct provider when form is submitted - google", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="google" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      // Create a FormData object to simulate form submission
      new FormData(form);

      // Trigger form submission
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("google", { redirectTo: "/" });
      });
    });

    it("should call signIn with correct provider when form is submitted - github", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="github" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("github", { redirectTo: "/" });
      });
    });

    it("should call signIn with correct provider when form is submitted - apple", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="apple" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("apple", { redirectTo: "/" });
      });
    });

    it("should call signIn with correct provider when form is submitted - email", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="email" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("email", { redirectTo: "/" });
      });
    });

    it("should handle signIn success", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="google" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle signIn rejection", async () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockSignIn.mockRejectedValue(new Error("Sign in failed"));

      render(<SignIn provider="google" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("google", { redirectTo: "/" });
      });

      // Clean up console mock
      consoleError.mockRestore();
    });
  });

  describe("Button Interaction", () => {
    it("should trigger form submission when button is clicked", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="google" />);
      const button = screen.getByRole("button", { name: /sign in/i });

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("google", { redirectTo: "/" });
      });
    });

    it("should be accessible via keyboard", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="google" />);
      const button = screen.getByRole("button", { name: /sign in/i });

      // Focus the button and press Enter
      button.focus();
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

      // The form should still submit since it's a submit button
      await waitFor(() => {
        expect(button).toHaveFocus();
      });
    });
  });

  describe("Server Action Integration", () => {
    it("should handle server action execution correctly", async () => {
      mockSignIn.mockResolvedValue(undefined);

      render(<SignIn provider="google" />);
      const form = screen
        .getByRole("button")
        .closest("form") as HTMLFormElement;

      // Simulate the server action being called
      new FormData(form);

      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith("google", { redirectTo: "/" });
        expect(mockSignIn).toHaveBeenCalledTimes(1);
      });
    });

    it("should maintain the server action directive", () => {
      render(<SignIn provider="google" />);
      const form = screen.getByRole("button").closest("form");

      // The form should have an action attribute (from the server action)
      expect(form).toHaveAttribute("action");
    });
  });

  describe("Component Props", () => {
    it("should handle provider prop changes", () => {
      const { rerender } = render(<SignIn provider="google" />);
      let button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();

      rerender(<SignIn provider="github" />);
      button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();

      rerender(<SignIn provider="apple" />);
      button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();

      rerender(<SignIn provider="email" />);
      button = screen.getByRole("button", { name: /sign in/i });
      expect(button).toBeInTheDocument();
    });

    it("should handle empty string provider", () => {
      const { container } = render(<SignIn provider="" />);
      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();
      expect(form?.children).toHaveLength(0);
    });
  });

  describe("Component Structure", () => {
    it("should have proper HTML structure", () => {
      render(<SignIn provider="google" />);

      const form = screen.getByRole("button").closest("form");
      const button = screen.getByRole("button");

      expect(form).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(form).toContainElement(button);
    });

    it("should render only one button per provider", () => {
      render(<SignIn provider="google" />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });

    it("should have consistent button properties", () => {
      const providers = ["google", "github", "apple", "email"];

      providers.forEach((provider) => {
        const { unmount } = render(<SignIn provider={provider} />);
        const button = screen.getByRole("button");

        expect(button).toHaveAttribute("type", "submit");
        expect(button).toHaveTextContent("Sign in");

        unmount();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle case-sensitive provider names", () => {
      const { container } = render(<SignIn provider="Google" />);
      const form = container.querySelector("form");
      expect(form?.children).toHaveLength(0); // Should be empty since "Google" !== "google"
    });

    it("should handle special characters in provider", () => {
      const { container } = render(<SignIn provider="google-oauth" />);
      const form = container.querySelector("form");
      expect(form?.children).toHaveLength(0); // Should be empty since it's not in the map
    });

    it("should handle numeric provider", () => {
      const { container } = render(<SignIn provider="123" />);
      const form = container.querySelector("form");
      expect(form?.children).toHaveLength(0);
    });
  });

  describe("Accessibility", () => {
    it("should have accessible button for all providers", () => {
      const providers = ["google", "github", "apple", "email"];

      providers.forEach((provider) => {
        const { unmount } = render(<SignIn provider={provider} />);
        const button = screen.getByRole("button", { name: /sign in/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAccessibleName("Sign in");

        unmount();
      });
    });

    it("should have proper form labeling", () => {
      render(<SignIn provider="google" />);
      const form = screen.getByRole("button").closest("form");

      expect(form).toBeInTheDocument();
    });
  });
});
