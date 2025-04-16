import { render } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("should render correctly with default size", () => {
    const spinner = render(<LoadingSpinner />);
    const spinnerEl = spinner.getByTestId("loading-spinner");
    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).toHaveClass("flex justify-center items-center");
  });

  it("should render correctly with small size", () => {
    const spinner = render(<LoadingSpinner size="small" />);
    const spinnerEl = spinner.getByTestId("loading-spinner-inner");
    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).toHaveClass("w-4 h-4 border-2");
    expect(spinnerEl).toHaveClass("rounded-full");
    expect(spinnerEl).toHaveClass("border-yellow-400");
    expect(spinnerEl).toHaveClass("border-t-transparent");
    expect(spinnerEl).toHaveClass("animate-spin");
  });

  it("should render correctly with medium size", () => {
    const spinner = render(<LoadingSpinner size="medium" />);
    const spinnerEl = spinner.getByTestId("loading-spinner-inner");
    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).toHaveClass("w-8 h-8 border-3");
  });

  it("should render correctly with large size", () => {
    const spinner = render(<LoadingSpinner size="large" />);
    const spinnerEl = spinner.getByTestId("loading-spinner-inner");
    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).toHaveClass("w-12 h-12 border-4");
  });

  it("should have the correct default class names", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinnerEl = getByTestId("loading-spinner-inner");
    expect(spinnerEl).toHaveClass(
      "rounded-full border-yellow-400 border-t-transparent animate-spin"
    );
  });
});
