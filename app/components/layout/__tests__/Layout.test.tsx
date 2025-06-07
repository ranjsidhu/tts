import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../Layout";
import type { Session } from "next-auth";

// Mock the external dependencies
jest.mock("react-hot-toast", () => ({
  Toaster: jest.fn(({ position }) => (
    <div data-testid="toaster" data-position={position} />
  )),
}));

jest.mock("@/app/components/footer/Footer", () => {
  return jest.fn(() => <div data-testid="footer">Footer</div>);
});

jest.mock("@/app/components/navbar/Navbar", () => {
  return jest.fn(({ session }) => (
    <div data-testid="navbar" data-session={JSON.stringify(session)}>
      Navbar
    </div>
  ));
});

jest.mock("@/lib/session", () => ({
  getSession: jest.fn(),
}));

// Import the mocked modules for type safety and assertions
import { Toaster } from "react-hot-toast";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { getSession } from "@/lib/session";

const MockedToaster = Toaster as jest.MockedFunction<typeof Toaster>;
const MockedFooter = Footer as jest.MockedFunction<typeof Footer>;
const MockedNavbar = Navbar as jest.MockedFunction<typeof Navbar>;
const MockedGetSession = getSession as jest.MockedFunction<typeof getSession>;

describe("Layout Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the layout structure correctly", async () => {
      MockedGetSession.mockResolvedValue(null);

      const TestChildren = () => (
        <div data-testid="test-children">Test Content</div>
      );

      render(
        await Layout({
          children: <TestChildren />,
        })
      );

      // Check main layout structure
      expect(screen.getByTestId("layout")).toBeInTheDocument();
      expect(screen.getByTestId("layout-main")).toBeInTheDocument();
      expect(screen.getByTestId("layout-children")).toBeInTheDocument();

      // Check components are rendered
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByTestId("toaster")).toBeInTheDocument();
      expect(screen.getByTestId("test-children")).toBeInTheDocument();
    });

    it("applies correct CSS classes", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: <div>Test</div>,
        })
      );

      const layout = screen.getByTestId("layout");
      const main = screen.getByTestId("layout-main");
      const childrenContainer = screen.getByTestId("layout-children");

      expect(layout).toHaveClass("min-h-screen", "flex", "flex-col");
      expect(main).toHaveClass("flex-1", "mt-28");
      expect(childrenContainer).toHaveClass("container", "mx-auto", "px-4");
    });
  });

  describe("Session handling", () => {
    it("passes session data to Navbar when session exists", async () => {
      const mockSession: Session = {
        user: { id: "1", name: "John Doe", email: "john@example.com" },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      MockedGetSession.mockResolvedValue(mockSession);

      render(
        await Layout({
          children: <div>Test</div>,
        })
      );

      expect(MockedGetSession).toHaveBeenCalledTimes(1);
      expect(MockedNavbar).toHaveBeenCalledWith({ session: mockSession }, {});

      const navbar = screen.getByTestId("navbar");
      expect(navbar).toHaveAttribute(
        "data-session",
        JSON.stringify(mockSession)
      );
    });

    it("passes null session to Navbar when no session exists", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: <div>Test</div>,
        })
      );

      expect(MockedGetSession).toHaveBeenCalledTimes(1);
      expect(MockedNavbar).toHaveBeenCalledWith({ session: null }, {});

      const navbar = screen.getByTestId("navbar");
      expect(navbar).toHaveAttribute("data-session", "null");
    });

    it("handles getSession errors gracefully", async () => {
      MockedGetSession.mockRejectedValue(new Error("Session error"));

      await expect(
        Layout({
          children: <div>Test</div>,
        })
      ).rejects.toThrow("Session error");
    });
  });

  describe("Children rendering", () => {
    it("renders single child component", async () => {
      MockedGetSession.mockResolvedValue(null);

      const TestChild = () => (
        <div data-testid="single-child">Single Child</div>
      );

      render(
        await Layout({
          children: <TestChild />,
        })
      );

      expect(screen.getByTestId("single-child")).toBeInTheDocument();
      expect(screen.getByText("Single Child")).toBeInTheDocument();
    });

    it("renders multiple children", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: (
            <>
              <div data-testid="child-1">Child 1</div>
              <div data-testid="child-2">Child 2</div>
              <div data-testid="child-3">Child 3</div>
            </>
          ),
        })
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });

    it("renders complex nested children", async () => {
      MockedGetSession.mockResolvedValue(null);

      const ComplexChild = () => (
        <div data-testid="complex-child">
          <h1>Title</h1>
          <p>Content</p>
          <button>Action</button>
        </div>
      );

      render(
        await Layout({
          children: <ComplexChild />,
        })
      );

      expect(screen.getByTestId("complex-child")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  describe("Component integration", () => {
    it("renders Toaster with correct position", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: <div>Test</div>,
        })
      );

      expect(MockedToaster).toHaveBeenCalledWith({ position: "top-right" }, {});

      const toaster = screen.getByTestId("toaster");
      expect(toaster).toHaveAttribute("data-position", "top-right");
    });

    it("renders Footer component", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: <div>Test</div>,
        })
      );

      expect(MockedFooter).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("renders all components in correct order", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: <div data-testid="test-content">Content</div>,
        })
      );

      const layout = screen.getByTestId("layout");
      const children = Array.from(layout.children);

      // Should have navbar, main, and footer as direct children
      expect(children).toHaveLength(3);
      expect(children[0]).toHaveAttribute("data-testid", "navbar");
      expect(children[1]).toHaveAttribute("data-testid", "layout-main");
      expect(children[2]).toHaveAttribute("data-testid", "footer");
    });
  });

  describe("Error scenarios", () => {
    it("handles missing children prop", async () => {
      MockedGetSession.mockResolvedValue(null);

      render(
        await Layout({
          children: undefined as any,
        })
      );

      expect(screen.getByTestId("layout")).toBeInTheDocument();
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });
});

// Additional test for TypeScript type checking
describe("Layout Props Types", () => {
  it("accepts valid LayoutProps", async () => {
    MockedGetSession.mockResolvedValue(null);

    const validProps = {
      children: <div>Valid children</div>,
    };

    const layoutComponent = await Layout(validProps);
    expect(layoutComponent).toBeDefined();
  });
});
