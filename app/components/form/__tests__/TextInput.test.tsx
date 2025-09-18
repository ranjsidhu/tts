import TextInput from "../TextInput";
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

describe("TextInput", () => {
  it("renders the textinput with default props", () => {
    render(<TextInput {...defaultProps} />);
    const textinput = screen.getByRole("textbox");
    expect(textinput).toBeInTheDocument();
    expect(textinput).toHaveAttribute("placeholder", "Placeholder");
  });

  it("renders the textinput with custom rows and placeholder", () => {
    render(<TextInput {...defaultProps} placeholder="Custom placeholder" />);
    const textinput = screen.getByRole("textbox");
    expect(textinput).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("applies custom className", () => {
    render(<TextInput className="custom-class" {...defaultProps} />);
    const textinput = screen.getByRole("textbox");
    expect(textinput).toHaveClass("custom-class");
  });

  it("passes data-testid to the textinput", () => {
    render(<TextInput data-testid="custom-textinput" {...defaultProps} />);
    const textinput = screen.getByTestId("custom-textinput");
    expect(textinput).toBeInTheDocument();
  });

  it("applies the error className when isError is true", () => {
    render(
      <TextInput
        isError={true}
        name="test-error"
        value=""
        labelText="test error"
        placeholder="test-error"
        errorMessage="Error Message Test"
        onChange={() => {}}
      />
    );
    const textinput = screen.getByRole("textbox");
    expect(textinput).toHaveClass("border-red-500");
  });
});
