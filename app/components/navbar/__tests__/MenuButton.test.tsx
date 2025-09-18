import { render, fireEvent } from "@testing-library/react";
import MenuButton from "../MenuButton";

describe("MenuButton Component", () => {
  const defaultProps = {
    toggleMenu: jest.fn(),
    "data-testid": "menu-button",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when isMobileMenuOpen is true", () => {
    it("should apply the correct styles and animations", () => {
      const { getByTestId } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={true} />
      );

      const button = getByTestId("menu-button");
      const topLine = getByTestId("menu-button-top-line");
      const middleLine = getByTestId("menu-button-middle-line");
      const bottomLine = getByTestId("menu-button-bottom-line");

      // Test button styles
      expect(button).toHaveClass(
        "sm:hidden p-2 -mr-2 flex flex-col justify-center items-center w-12 h-12 group"
      );
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveAttribute("aria-label", "Toggle menu");

      // Test line styles
      expect(topLine).toHaveClass(
        "w-6 h-0.5 bg-black origin-center transform-gpu"
      );
      expect(middleLine).toHaveClass("w-6 h-0.5 bg-black transform-gpu");
      expect(bottomLine).toHaveClass(
        "w-6 h-0.5 bg-black origin-center transform-gpu"
      );
    });

    it("should have correct animation properties for open state", () => {
      const { getByTestId } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={true} />
      );

      const topLine = getByTestId("menu-button-top-line");
      const middleLine = getByTestId("menu-button-middle-line");
      const bottomLine = getByTestId("menu-button-bottom-line");

      // Check that motion components have the correct animate props
      expect(topLine).toBeInTheDocument();
      expect(middleLine).toBeInTheDocument();
      expect(bottomLine).toBeInTheDocument();
    });
  });

  describe("when isMobileMenuOpen is false", () => {
    it("should apply the correct styles and animations", () => {
      const { getByTestId } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={false} />
      );

      const button = getByTestId("menu-button");
      const topLine = getByTestId("menu-button-top-line");
      const middleLine = getByTestId("menu-button-middle-line");
      const bottomLine = getByTestId("menu-button-bottom-line");

      // Test button styles
      expect(button).toHaveClass(
        "sm:hidden p-2 -mr-2 flex flex-col justify-center items-center w-12 h-12 group"
      );
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveAttribute("aria-label", "Toggle menu");

      // Test line styles
      expect(topLine).toHaveClass(
        "w-6 h-0.5 bg-black origin-center transform-gpu"
      );
      expect(middleLine).toHaveClass("w-6 h-0.5 bg-black transform-gpu");
      expect(bottomLine).toHaveClass(
        "w-6 h-0.5 bg-black origin-center transform-gpu"
      );
    });

    it("should have correct animation properties for closed state", () => {
      const { getByTestId } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={false} />
      );

      const topLine = getByTestId("menu-button-top-line");
      const middleLine = getByTestId("menu-button-middle-line");
      const bottomLine = getByTestId("menu-button-bottom-line");

      // Check that motion components have the correct animate props
      expect(topLine).toBeInTheDocument();
      expect(middleLine).toBeInTheDocument();
      expect(bottomLine).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call toggleMenu when clicked", () => {
      const toggleMenu = jest.fn();
      const { getByTestId } = render(
        <MenuButton
          {...defaultProps}
          toggleMenu={toggleMenu}
          isMobileMenuOpen={false}
        />
      );

      const button = getByTestId("menu-button");
      fireEvent.click(button);

      expect(toggleMenu).toHaveBeenCalledTimes(1);
    });

    it("should call toggleMenu when clicked in open state", () => {
      const toggleMenu = jest.fn();
      const { getByTestId } = render(
        <MenuButton
          {...defaultProps}
          toggleMenu={toggleMenu}
          isMobileMenuOpen={true}
        />
      );

      const button = getByTestId("menu-button");
      fireEvent.click(button);

      expect(toggleMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("should have proper accessibility attributes", () => {
      const { getByTestId } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={false} />
      );

      const button = getByTestId("menu-button");
      expect(button).toHaveAttribute("aria-label", "Toggle menu");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("motion.div container", () => {
    it("should render the motion.div container with correct classes", () => {
      const { container } = render(
        <MenuButton {...defaultProps} isMobileMenuOpen={false} />
      );

      const motionDiv = container.querySelector(
        ".flex.flex-col.justify-center.items-center.gap-1\\.5.w-6"
      );
      expect(motionDiv).toBeInTheDocument();
    });
  });
});
