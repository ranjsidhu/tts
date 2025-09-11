import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { links } from "@/app/static";
import type { Session } from "next-auth";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock auth components
jest.mock("@/app/components/auth/SignOut", () => ({
  __esModule: true,
  default: () => <button data-testid="sign-out-button">Sign Out</button>,
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
});
