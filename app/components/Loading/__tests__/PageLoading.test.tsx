import { render, screen } from "@testing-library/react";
import PageLoading from "../PageLoading";

describe("PageLoading Component", () => {
  it("should render correctly", () => {
    render(<PageLoading />);
    const loadingElement = screen.getByTestId("page-loading");
    expect(loadingElement).toBeInTheDocument();
  });

  it("should contain LoadingSpinner", () => {
    render(<PageLoading />);
    const spinnerElement = screen.getByTestId("page-loading-loading-spinner");
    expect(spinnerElement).toBeInTheDocument();
  });
});
