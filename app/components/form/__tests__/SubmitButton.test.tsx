import SubmitButton from "../SubmitButton";
import { render, screen } from "@testing-library/react";

describe("SubmitButton", () => {
  it("renders the button with default text", () => {
    render(<SubmitButton isLoading={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("renders the button with loading text and spinner when isLoading is true", () => {
    render(<SubmitButton isLoading={true} />);
    expect(screen.getByRole("button")).toHaveTextContent("Sending...");
    expect(screen.getByTestId("page-loading")).toBeInTheDocument();
  });

  it("disables the button when disabled prop is true", () => {
    render(<SubmitButton isLoading={false} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<SubmitButton isLoading={false} className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("passes data-testid to the button", () => {
    render(<SubmitButton isLoading={false} data-testid="submit-btn" />);
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });
});
