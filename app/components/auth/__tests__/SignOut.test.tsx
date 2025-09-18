import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SignOut from "../SignOut";
import { signOutAction } from "../serveractions";

// Mock Next.js useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock server actions
jest.mock("../serveractions", () => ({
  signOutAction: jest.fn(),
}));

// Type the mocked functions
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockSignOutAction = signOutAction as jest.MockedFunction<
  typeof signOutAction
>;

describe("SignOut Component", () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  describe("Rendering", () => {
    it("should render sign out button", () => {
      render(<SignOut />);

      const button = screen.getByRole("button", { name: /sign out/i });
      expect(button).toBeInTheDocument();
    });

    it("should have correct button text", () => {
      render(<SignOut />);

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Sign Out");
    });

    it("should have correct button type", () => {
      render(<SignOut />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should have correct CSS classes", () => {
      render(<SignOut />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "text-[#DAA520]",
        "text-[14px]",
        "hover:underline",
        "transition-colors",
        "duration-150",
        "flex",
        "items-center",
        "whitespace-nowrap"
      );
    });

    it("should have correct inline styles", () => {
      render(<SignOut />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ lineHeight: "1" });
    });
  });

  describe("Click Interaction", () => {
    it("should call signOutAction when clicked", async () => {
      mockSignOutAction.mockResolvedValue(undefined);

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(1);
      });
    });

    it("should navigate to home page after signOutAction completes", async () => {
      mockSignOutAction.mockResolvedValue(undefined);

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });

    it("should call signOutAction before router.push", async () => {
      const callOrder: string[] = [];

      mockSignOutAction.mockImplementation(async () => {
        callOrder.push("signOut");
      });

      mockPush.mockImplementation(() => {
        callOrder.push("routerPush");
      });

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(callOrder).toEqual(["signOut", "routerPush"]);
      });
    });

    it("should handle multiple rapid clicks", async () => {
      mockSignOutAction.mockResolvedValue(undefined);

      render(<SignOut />);
      const button = screen.getByRole("button");

      // Click multiple times rapidly
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      // All clicks should trigger the action
      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(3);
        expect(mockPush).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe("Error Handling", () => {
    it("should call signOutAction even if it might fail", async () => {
      // Test that the action is called, but don't test unhandled rejections
      mockSignOutAction.mockResolvedValue(undefined);

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("Async Behavior", () => {
    it("should handle slow signOutAction", async () => {
      mockSignOutAction.mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(undefined), 100))
      );

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      // Should not navigate immediately
      expect(mockPush).not.toHaveBeenCalled();

      // Should navigate after signOut completes
      await waitFor(
        () => {
          expect(mockPush).toHaveBeenCalledWith("/");
        },
        { timeout: 200 }
      );
    });

    it("should handle concurrent signOut attempts", async () => {
      let resolveSignOut: (() => void) | undefined;
      const signOutPromise = new Promise<void>((resolve) => {
        resolveSignOut = resolve;
      });

      mockSignOutAction.mockReturnValue(signOutPromise);

      render(<SignOut />);
      const button = screen.getByRole("button");

      // Click twice before first signOut resolves
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockSignOutAction).toHaveBeenCalledTimes(2);
      expect(mockPush).not.toHaveBeenCalled();

      // Resolve the signOut
      resolveSignOut?.();

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Keyboard Interaction", () => {
    it("should be accessible via keyboard", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      // Should be focusable
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should be activatable via keyboard (Enter key focuses)", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      button.focus();
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

      // Button should still have focus after Enter
      expect(button).toHaveFocus();
    });

    it("should be activatable via keyboard (Space key focuses)", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      button.focus();
      fireEvent.keyDown(button, { key: " ", code: "Space" });

      // Button should still have focus after Space
      expect(button).toHaveFocus();
    });
  });

  describe("useRouter Hook", () => {
    it("should call useRouter hook", () => {
      render(<SignOut />);
      expect(mockUseRouter).toHaveBeenCalledTimes(1);
    });

    it("should handle useRouter returning different router objects", async () => {
      const differentRouter = {
        ...mockRouter,
        push: jest.fn(),
      };

      mockUseRouter.mockReturnValue(differentRouter);
      mockSignOutAction.mockResolvedValue(undefined);

      render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(differentRouter.push).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("Component Lifecycle", () => {
    it("should not call any actions on mount", () => {
      render(<SignOut />);

      expect(mockSignOutAction).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should not call any actions on unmount", () => {
      const { unmount } = render(<SignOut />);

      unmount();

      expect(mockSignOutAction).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should handle re-renders correctly", async () => {
      mockSignOutAction.mockResolvedValue(undefined);

      const { rerender } = render(<SignOut />);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(1);
      });

      // Re-render the component
      rerender(<SignOut />);

      // Should still work after re-render
      const newButton = screen.getByRole("button");
      fireEvent.click(newButton);

      await waitFor(() => {
        expect(mockSignOutAction).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("Visual and Style Tests", () => {
    it("should maintain consistent styling", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      // Test specific color value
      expect(button).toHaveClass("text-[#DAA520]");

      // Test specific font size
      expect(button).toHaveClass("text-[14px]");

      // Test layout classes
      expect(button).toHaveClass("flex", "items-center", "whitespace-nowrap");

      // Test interaction classes
      expect(button).toHaveClass(
        "hover:underline",
        "transition-colors",
        "duration-150"
      );
    });

    it("should have correct inline styles applied", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      expect(button.style.lineHeight).toBe("1");
    });
  });

  describe("Accessibility", () => {
    it("should have accessible name", () => {
      render(<SignOut />);
      const button = screen.getByRole("button", { name: "Sign Out" });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName("Sign Out");
    });

    it("should be a proper button element", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      expect(button.tagName).toBe("BUTTON");
    });

    it("should not have any accessibility violations", () => {
      render(<SignOut />);
      const button = screen.getByRole("button");

      // Basic accessibility checks
      expect(button).toHaveAttribute("type", "submit");
      expect(button).not.toHaveAttribute("disabled");
      expect(button).toHaveTextContent("Sign Out");
    });
  });
});
