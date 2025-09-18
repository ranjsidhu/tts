import RadioInput from "../RadioInput";
import { render, screen } from "@testing-library/react";

describe("RadioInput", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders the radio input with correct props", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
        data-testid="radio-input"
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput).toBeInTheDocument();
    expect(radioInput.name).toBe("testRadio");
    expect(radioInput.value).toBe("option1");
    expect(radioInput.checked).toBe(false);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders as checked when the checked prop is true", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={true}
        radioText="Option 1"
        onChange={mockOnChange}
        data-testid="radio-input"
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput.checked).toBe(true);
  });

  it("sets checked to false by default", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        radioText="Option 1"
        onChange={mockOnChange}
        data-testid="radio-input"
        checked={null as unknown as boolean}
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput.checked).toBe(false);
  });

  it("handles data-testid prop correctly", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
        data-testid="custom-radio-input"
      />
    );
    const radioInput = screen.getByTestId(
      "custom-radio-input"
    ) as HTMLInputElement;
    expect(radioInput).toBeInTheDocument();

    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
      />
    );
    expect(screen.queryByTestId("")).toBeInTheDocument();
  });

  it("renders as disabled when the disabled prop is true", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
        disabled={true}
        data-testid="radio-input"
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput.disabled).toBe(true);
  });

  it("is required when the required prop is true", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
        required={true}
        data-testid="radio-input"
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput.required).toBe(true);
  });
  it("applies additional class names", () => {
    render(
      <RadioInput
        name="testRadio"
        value="option1"
        checked={false}
        radioText="Option 1"
        onChange={mockOnChange}
        className="custom-class"
        data-testid="radio-input"
      />
    );

    const radioInput = screen.getByTestId("radio-input") as HTMLInputElement;
    expect(radioInput.className).toContain("custom-class");
  });
});
