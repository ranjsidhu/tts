import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Navbar from "../Navbar";
import { links } from "@/app/static";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

interface UIState {
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleMobileMenu: (state, action: PayloadAction<{ visible: boolean }>) => {
      state.isMobileMenuOpen = action.payload.visible;
    },
  },
});

// Create a mock store
const createMockStore = (
  initialState = { UI: { isMobileMenuOpen: false } }
) => {
  return configureStore({
    reducer: {
      UI: uiSlice.reducer,
    },
    preloadedState: initialState,
  });
};

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
});
