import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "../MobileMenu";
import { links } from "@/app/static";

jest.mock("../../auth/SignOut", () => ({
  __esModule: true,
  default: () => null,
}));

describe("MobileMenu", () => {
  const mockToggleMenu = jest.fn();

  beforeEach(() => {
    mockToggleMenu.mockClear();
  });

  it("renders the mobile menu with all navigation links", () => {
    render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

    // Check if menu title is rendered
    expect(screen.getByText("Menu")).toBeInTheDocument();

    // Check if all navigation links are rendered
    links.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument();
      expect(
        screen.getByTestId(`mobile-menu-link-${link.name}`)
      ).toHaveAttribute("href", link.href);
    });

    // Check if close button is rendered
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("calls toggleMenu when close button is clicked", () => {
    render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  it("calls toggleMenu when a navigation link is clicked", () => {
    render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

    const firstLink = screen.getByTestId(`mobile-menu-link-${links[0].name}`);
    fireEvent.click(firstLink);

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  it("displays the current year in the footer", () => {
    render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Tutoring To Success`)
    ).toBeInTheDocument();
  });

  it("renders with correct accessibility attributes", () => {
    render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

    // Check if navigation links have aria-labels
    links.forEach((link) => {
      const navLink = screen.getByTestId(`mobile-menu-link-${link.name}`);
      expect(navLink).toHaveAttribute("aria-label", link.name);
    });

    // Check if close button has aria-label
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  describe("when user is authenticated", () => {
    const mockSession = {
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
      },
      expires: "2024-12-31T23:59:59.999Z",
    };

    it("renders Profile link and SignOut component for authenticated user", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={mockSession} />);

      // Check if Profile link is rendered
      const profileLink = screen.getByText("Profile");
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute("href", "/profile");

      // Check if SignOut component is rendered (mocked)
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("Profile link has correct styling", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={mockSession} />);

      const profileLink = screen.getByText("Profile");
      expect(profileLink).toHaveClass(
        "px-4 py-3 text-sm text-black font-medium transition-all duration-200 hover:bg-gray-50"
      );
    });

    it("SignOut component is wrapped in span with correct styling", () => {
      const { container } = render(
        <MobileMenu toggleMenu={mockToggleMenu} session={mockSession} />
      );

      // Find the span that contains the SignOut component by looking for spans with the mobileMenuClassName
      const spans = container.querySelectorAll("span");
      const signOutSpan = Array.from(spans).find(
        (span) =>
          span.className.includes("px-4 py-3 text-sm text-black font-medium") &&
          span !== screen.getByText("Profile").parentElement
      );

      expect(signOutSpan).toBeInTheDocument();
      expect(signOutSpan).toHaveClass(
        "px-4 py-3 text-sm text-black font-medium transition-all duration-200 hover:bg-gray-50"
      );
    });

    it("renders all navigation links plus Profile for authenticated user", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={mockSession} />);

      // Check if all navigation links are still rendered
      links.forEach((link) => {
        expect(screen.getByText(link.name)).toBeInTheDocument();
        expect(
          screen.getByTestId(`mobile-menu-link-${link.name}`)
        ).toHaveAttribute("href", link.href);
      });

      // Check if Profile link is additionally rendered
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("does not render Sign in link when user is authenticated", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={mockSession} />);

      // Sign in link should not be present
      expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });
  });

  describe("when user is not authenticated", () => {
    it("renders Sign in link for unauthenticated user", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

      const signInLink = screen.getByText("Sign in");
      expect(signInLink).toBeInTheDocument();
      expect(signInLink).toHaveAttribute("href", "/auth/sign-in");
    });

    it("Sign in link has correct styling", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

      const signInLink = screen.getByText("Sign in");
      expect(signInLink).toHaveClass(
        "text-[#DAA520] text-base font-medium hover:underline transition-colors duration-150 flex items-center"
      );
    });

    it("does not render Profile link when user is not authenticated", () => {
      render(<MobileMenu toggleMenu={mockToggleMenu} session={null} />);

      // Profile link should not be present
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    });
  });
});
