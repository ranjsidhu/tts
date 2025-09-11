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
});
