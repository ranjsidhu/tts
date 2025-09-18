import { usePathname } from "next/navigation";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../Navbar";
import { links } from "@/app/static";
import type { Session } from "next-auth";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock auth components
jest.mock("@/app/components/auth/SignOut", () => ({
  __esModule: true,
  default: () => (
    <button type="submit" data-testid="sign-out-button">
      Sign Out
    </button>
  ),
}));

// Mock MenuButton component
jest.mock("../MenuButton", () => ({
  __esModule: true,
  default: ({
    toggleMenu,
    isMobileMenuOpen,
    "data-testid": dataTestId,
  }: any) => (
    <button
      type="button"
      data-testid={dataTestId}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? "Close" : "Menu"}
    </button>
  ),
}));

// Mock MobileMenu component
jest.mock("../MobileMenu", () => ({
  __esModule: true,
  default: ({ toggleMenu }: any) => (
    <div data-testid="mobile-menu">
      <button onClick={toggleMenu} type="button">
        Close Mobile Menu
      </button>
      <div>Mobile Menu Content</div>
    </div>
  ),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  const renderNavbar = (session: Session | null = null) => {
    return render(<Navbar session={session} />);
  };

  it("renders the navbar container", () => {
    renderNavbar();
    expect(screen.getByTestId("navbar-container")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    renderNavbar();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders all desktop navigation links", () => {
    renderNavbar();
    links.forEach((link) => {
      expect(
        screen.getByTestId(`navbar-link-${link.name}`)
      ).toBeInTheDocument();
    });
  });

  it("renders the mobile menu button", () => {
    renderNavbar();
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  it("highlights active link based on current pathname", () => {
    const activePath = links[0].href;
    (usePathname as jest.Mock).mockReturnValue(activePath);

    renderNavbar();

    const activeLink = screen.getByTestId(`navbar-link-${links[0].name}`);
    expect(activeLink).toHaveClass("after:absolute");
    expect(activeLink).toHaveClass("after:bottom-0");
    expect(activeLink).toHaveClass("after:left-2");
    expect(activeLink).toHaveClass("after:right-2");
    expect(activeLink).toHaveClass("after:h-0.5");
    expect(activeLink).toHaveClass("after:bg-yellow-400");
  });

  it("shows sign in link when user is not logged in", () => {
    renderNavbar();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("shows sign out button when user is logged in", () => {
    renderNavbar({
      user: { email: "test@example.com" },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
    expect(screen.getByTestId("sign-out-button")).toBeInTheDocument();
  });

  describe("mobile menu functionality", () => {
    it("toggles mobile menu when menu button is clicked", async () => {
      renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");
      expect(menuButton).toHaveTextContent("Menu");

      // Click to open menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
      });
      expect(menuButton).toHaveTextContent("Close");

      // Click to close menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
      });
      expect(menuButton).toHaveTextContent("Menu");
    });

    it("renders mobile menu when isMobileMenuOpen is true", async () => {
      renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");
      fireEvent.click(menuButton);

      await waitFor(() => {
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
      });
    });

    it("does not render mobile menu when isMobileMenuOpen is false", () => {
      renderNavbar();

      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });

    it("closes mobile menu when close button in mobile menu is clicked", async () => {
      renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");
      fireEvent.click(menuButton);

      await waitFor(() => {
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
      });

      const closeButton = screen.getByText("Close Mobile Menu");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
      });
    });
  });

  describe("authenticated user features", () => {
    const mockSession = {
      user: { email: "test@example.com" },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    it("renders Profile link with UserCircle icon for authenticated user", () => {
      renderNavbar(mockSession);

      const profileLink = screen.getByRole("link", { name: "" });
      expect(profileLink).toHaveAttribute("href", "/profile");

      // Check for UserCircle icon (it will be rendered as an SVG)
      const userCircleIcon = profileLink.querySelector("svg");
      expect(userCircleIcon).toBeInTheDocument();
    });

    it("renders SignOut component for authenticated user", () => {
      renderNavbar(mockSession);

      expect(screen.getByTestId("sign-out-button")).toBeInTheDocument();
    });

    it("does not render Sign in link when user is authenticated", () => {
      renderNavbar(mockSession);

      expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });
  });

  describe("unauthenticated user features", () => {
    it("renders Sign in link for unauthenticated user", () => {
      renderNavbar();

      const signInLink = screen.getByText("Sign in");
      expect(signInLink).toHaveAttribute("href", "/auth/sign-in");
      expect(signInLink).toHaveClass("text-[#DAA520]");
    });

    it("does not render Profile link when user is not authenticated", () => {
      renderNavbar();

      const profileLinks = screen.queryAllByRole("link", { name: "" });
      const profileLink = profileLinks.find(
        (link) => link.getAttribute("href") === "/profile"
      );
      expect(profileLink).toBeUndefined();
    });
  });

  describe("useEffect body overflow management", () => {
    let originalOverflow: string;

    beforeEach(() => {
      originalOverflow = document.body.style.overflow;
    });

    afterEach(() => {
      document.body.style.overflow = originalOverflow;
    });

    it("sets body overflow to hidden when mobile menu opens", async () => {
      renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");
      fireEvent.click(menuButton);

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });
    });

    it("resets body overflow to unset when mobile menu closes", async () => {
      renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");

      // Open menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });

      // Close menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(document.body.style.overflow).toBe("unset");
      });
    });

    it("cleans up body overflow on component unmount", () => {
      const { unmount } = renderNavbar();

      const menuButton = screen.getByTestId("mobile-menu-button");
      fireEvent.click(menuButton);

      // Unmount component
      unmount();

      // Body overflow should be reset
      expect(document.body.style.overflow).toBe("unset");
    });
  });
});
