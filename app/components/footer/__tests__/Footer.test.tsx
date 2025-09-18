import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../Footer";
import { config } from "@/app/utils/config";
import { links, privacyAndTerms } from "@/app/static";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

describe("Footer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the footer container with correct structure", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer-content")).toBeInTheDocument();
  });

  it("renders all main sections", () => {
    render(<Footer />);

    // Check for section headings
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Key Information")).toBeInTheDocument();
    expect(screen.getByText("Opening Hours")).toBeInTheDocument();
    expect(screen.getByText("Book a Consultation")).toBeInTheDocument();
  });

  describe("ContactUs component", () => {
    it("renders contact information correctly", () => {
      render(<Footer />);

      // Phone number
      const phoneLink = screen.getByRole("link", { name: "01902 239 339" });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute("href", "tel:+441902239339");

      // Email
      const emailLink = screen.getByRole("link", { name: config.adminEmail });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute("href", `mailto:${config.adminEmail}`);

      // Addresses - using more flexible text matching for multi-line content
      expect(screen.getByText(/337 Tettenhall Road/)).toBeInTheDocument();
      expect(screen.getAllByText(/Wolverhampton/)).toHaveLength(2); // Appears in both addresses
      expect(screen.getByText(/WV6 0SU/)).toBeInTheDocument();
      expect(screen.getByText(/62 Codsall Road/)).toBeInTheDocument();
      expect(screen.getByText(/WV6 9QP/)).toBeInTheDocument();
    });

    it("opens maps when address buttons are clicked", () => {
      render(<Footer />);

      const addressButtons = screen.getAllByRole("button");
      const tettenhallButton = addressButtons.find((button) =>
        button.textContent?.includes("337 Tettenhall Road")
      );
      const codsallButton = addressButtons.find((button) =>
        button.textContent?.includes("62 Codsall Road")
      );

      if (tettenhallButton) {
        fireEvent.click(tettenhallButton);
        expect(mockWindowOpen).toHaveBeenCalledWith(
          "https://maps.app.goo.gl/V71AiLukv3wr3Y2g6"
        );
      }

      if (codsallButton) {
        fireEvent.click(codsallButton);
        expect(mockWindowOpen).toHaveBeenCalledWith(
          "https://maps.app.goo.gl/CwFyLVR9VLMDA1ZEA"
        );
      }
    });
  });

  describe("QuickLinks component", () => {
    it("renders all navigation links", () => {
      render(<Footer />);

      links.forEach((link) => {
        const linkElement = screen.getByRole("link", { name: link.name });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", link.href);
      });
    });

    it("renders privacy and terms links", () => {
      render(<Footer />);

      privacyAndTerms.forEach((link) => {
        const linkElement = screen.getByRole("link", { name: link.name });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", link.href);
      });
    });
  });

  describe("OpeningHours component", () => {
    it("renders opening hours information", () => {
      render(<Footer />);

      expect(screen.getByText("Term Time Hours")).toBeInTheDocument();
      expect(
        screen.getByText("Monday - Friday: 4pm - 8pm")
      ).toBeInTheDocument();
      expect(screen.getByText("Weekends: 8am - 2pm")).toBeInTheDocument();
      expect(
        screen.getByText("Holiday schedules may vary")
      ).toBeInTheDocument();
    });
  });

  describe("CopyrightSocials component", () => {
    it("renders copyright information with current year", () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      expect(
        screen.getByText(`© ${currentYear} RS Web Consultancy.`)
      ).toBeInTheDocument();
      expect(
        screen.getByText("Company Registration Number: 15228068")
      ).toBeInTheDocument();
    });

    it("opens developer website when copyright is clicked", () => {
      render(<Footer />);

      const copyrightButton = screen.getByRole("button", {
        name: `© ${new Date().getFullYear()} RS Web Consultancy.`,
      });
      fireEvent.click(copyrightButton);

      expect(mockWindowOpen).toHaveBeenCalledWith("https://ranjsidhu.dev");
    });

    it("renders social media icons", () => {
      render(<Footer />);

      const instagramIcon = screen.getByAltText("Instagram");
      const facebookIcon = screen.getByAltText("Facebook");

      expect(instagramIcon).toBeInTheDocument();
      expect(facebookIcon).toBeInTheDocument();
    });

    it("opens social media links when icons are clicked", () => {
      render(<Footer />);

      const instagramIcon = screen.getByAltText("Instagram");
      const facebookIcon = screen.getByAltText("Facebook");

      fireEvent.click(instagramIcon);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        "https://www.instagram.com/tutoringtosuccesswolverhampton/"
      );

      fireEvent.click(facebookIcon);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        "https://www.facebook.com/share/19mnvxTJP2/?mibextid=wwXIfr"
      );
    });
  });

  describe("Consultation section", () => {
    it("renders consultation form section", () => {
      render(<Footer />);

      expect(screen.getByText("Book a Consultation")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Interested in our tuition services? Leave your email for a free consultation."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Request Information")).toBeInTheDocument();
    });

    it("has correct button styling", () => {
      render(<Footer />);

      const button = screen.getByTestId("footer-submit-button");
      expect(button).toHaveClass(
        "w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
      );
      expect(button).toHaveAttribute("type", "submit");
    });

    it("navigates to enquiry section when button is clicked", () => {
      render(<Footer />);

      const button = screen.getByTestId("footer-submit-button");
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/#enquiry");
    });
  });

  describe("CSS classes and styling", () => {
    it("applies correct CSS classes to footer container", () => {
      render(<Footer />);

      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("bg-black text-white mt-9");
    });

    it("applies correct CSS classes to footer content", () => {
      render(<Footer />);

      const footerContent = screen.getByTestId("footer-content");
      expect(footerContent).toHaveClass(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      );
    });

    it("applies correct grid layout classes", () => {
      render(<Footer />);

      const gridContainer = screen
        .getByTestId("footer-content")
        .querySelector(".grid");
      expect(gridContainer).toHaveClass(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      );
    });
  });

  describe("accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<Footer />);

      const headings = screen.getAllByRole("heading");
      expect(headings).toHaveLength(4); // Contact Us, Key Information, Opening Hours, Book a Consultation

      // Check that headings have appropriate levels
      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      expect(h3Elements).toHaveLength(4);
    });

    it("has proper link accessibility", () => {
      render(<Footer />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("href");
      });
    });

    it("has proper button accessibility", () => {
      render(<Footer />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("type");
      });
    });
  });
});
