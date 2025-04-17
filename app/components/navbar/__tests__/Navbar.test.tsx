import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "../Navbar";
import { links } from "@/app/static";
import { createMockStore } from "@/app/utils/tests/mock-store";

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

describe("Navbar Component", () => {
  const mockOnNavbarOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  const renderNavbar = (store = createMockStore()) => {
    return render(
      <Provider store={store}>
        <Navbar onNavbarOpen={mockOnNavbarOpen} />
      </Provider>
    );
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

  it("toggles mobile menu when menu button is clicked", () => {
    const store = createMockStore();
    renderNavbar(store);

    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton);

    expect(mockOnNavbarOpen).toHaveBeenCalledWith(true);
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

  it("renders mobile menu when isMobileMenuOpen is true", () => {
    const store = createMockStore({ UI: { isMobileMenuOpen: true } });
    renderNavbar(store);

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    links.forEach((link) => {
      expect(
        screen.getByTestId(`mobile-menu-link-${link.name}`)
      ).toBeInTheDocument();
    });
  });

  it("closes mobile menu when a link is clicked", () => {
    const store = createMockStore({ UI: { isMobileMenuOpen: true } });
    renderNavbar(store);

    const mobileLink = screen.getByTestId(`mobile-menu-link-${links[0].name}`);

    act(() => {
      fireEvent.click(mobileLink);
    });

    // The menu should be closed after clicking a link
    expect(store.getState().UI.isMobileMenuOpen).toBe(false);
  });

  it("applies correct styling to active mobile menu link", () => {
    const activePath = links[0].href;
    (usePathname as jest.Mock).mockReturnValue(activePath);
    const store = createMockStore({ UI: { isMobileMenuOpen: true } });

    renderNavbar(store);

    const activeMobileLink = screen.getByTestId(
      `mobile-menu-link-${links[0].name}`
    );
    expect(activeMobileLink).toHaveClass("text-black");
    expect(activeMobileLink).toHaveClass("border-l-4");
    expect(activeMobileLink).toHaveClass("border-yellow-400");
    expect(activeMobileLink).toHaveClass("bg-gray-50");
  });

  it("applies correct styling to inactive mobile menu link", () => {
    const activePath = links[0].href;
    (usePathname as jest.Mock).mockReturnValue(activePath);
    const store = createMockStore({ UI: { isMobileMenuOpen: true } });

    renderNavbar(store);

    const inactiveMobileLink = screen.getByTestId(
      `mobile-menu-link-${links[1].name}`
    );
    expect(inactiveMobileLink).toHaveClass("text-gray-600");
    expect(inactiveMobileLink).not.toHaveClass("text-black");
    expect(inactiveMobileLink).not.toHaveClass("border-l-4");
    expect(inactiveMobileLink).not.toHaveClass("border-yellow-400");
    expect(inactiveMobileLink).not.toHaveClass("bg-gray-50");
  });
});
