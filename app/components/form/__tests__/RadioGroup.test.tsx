import RadioGroup from "../RadioGroup";
import { render, screen } from "@testing-library/react";

describe("RadioGroup", () => {
  it("renders the form group label", () => {
    render(
      <RadioGroup formGroupLabel="Choose an option">
        <div>Option 1</div>
        <div>Option 2</div>
      </RadioGroup>
    );
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("renders the children", () => {
    render(
      <RadioGroup formGroupLabel="Choose an option">
        <div>Option 1</div>
        <div>Option 2</div>
      </RadioGroup>
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
