import { render } from "@testing-library/react";
import MenuButton from "../MenuButton";

describe("MenuButton Component", () => {
  it("should apply the correct styles when isMobileMenuOpen is true", () => {
    const toggleMenu = jest.fn();
    const { getByTestId } = render(
      <MenuButton
        toggleMenu={toggleMenu}
        isMobileMenuOpen={true}
        data-testid="menu-button"
      />
    );
    const button = getByTestId("menu-button");
    const topLine = getByTestId("menu-button-top-line");
    const middleLine = getByTestId("menu-button-middle-line");
    const bottomLine = getByTestId("menu-button-bottom-line");
    expect(button).toHaveClass(
      "sm:hidden p-2 -mr-2 flex flex-col justify-center items-center w-12 h-12 group"
    );
    expect(topLine).toHaveClass(
      "w-6 h-0.5 bg-black origin-center transform-gpu"
    );
    expect(middleLine).toHaveClass("w-6 h-0.5 bg-black transform-gpu");
    expect(bottomLine).toHaveClass(
      "w-6 h-0.5 bg-black origin-center transform-gpu"
    );
  });
});
