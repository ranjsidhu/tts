import TextArea from "../TextArea";
import { render, screen } from "@testing-library/react";

const defaultProps = {
  name: "test-area",
  value: "test",
  labelText: "test-label",
  placeholder: "Placeholder",
  isError: false,
  errorMessage: "test error",
  onChange: () => {},
};

describe("TextArea", () => {
  it("renders the textarea with default props", () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Placeholder");
  });

  it("renders the textarea with custom rows and placeholder", () => {
    render(<TextArea {...defaultProps} placeholder="Custom placeholder" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("applies custom className", () => {
    render(<TextArea className="custom-class" {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  it("passes data-testid to the textarea", () => {
    render(<TextArea data-testid="custom-textarea" {...defaultProps} />);
    const textarea = screen.getByTestId("custom-textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("applies the error className when isError is true", () => {
    render(
      <TextArea
        isError={true}
        name="test-error"
        value=""
        labelText="test error"
        placeholder="test-error"
        errorMessage="Error Message Test"
        onChange={() => {}}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("border-red-500");
  });
});
