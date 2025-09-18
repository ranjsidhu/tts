import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EnquiryForm from "../EnquiryForm";

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the server actions
jest.mock("../serveractions", () => ({
  sendEmail: jest.fn(),
}));

// Mock the sanitiseInput utility
jest.mock("@/app/utils/sanitiseInput", () => ({
  sanitiseAndValidate: jest.fn(),
}));

// Mock the form components
jest.mock("../../form", () => ({
  TextInput: ({
    name,
    value,
    onChange,
    labelText,
    placeholder,
    type,
    disabled,
    isError,
    errorMessage,
    "data-testid": dataTestId,
    ...props
  }: any) => (
    <div>
      <label>
        {labelText}
        <input
          type={type || "text"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={dataTestId}
          className={isError ? "border-red-500" : "border-gray-300"}
          {...props}
        />
      </label>
      {isError && errorMessage && (
        <p data-testid="text-input-error">{errorMessage}</p>
      )}
    </div>
  ),
  TextArea: ({
    name,
    value,
    onChange,
    labelText,
    placeholder,
    disabled,
    isError,
    errorMessage,
    "data-testid": dataTestId,
    ...props
  }: any) => (
    <div>
      <label>
        {labelText}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          data-testid={dataTestId}
          className={isError ? "border-red-500" : "border-gray-300"}
          {...props}
        />
      </label>
      {isError && errorMessage && (
        <p data-testid="textarea-error">{errorMessage}</p>
      )}
    </div>
  ),
  SubmitButton: ({ isLoading, disabled, "data-testid": dataTestId }: any) => (
    <button
      type="submit"
      disabled={disabled || isLoading}
      data-testid={dataTestId || "submit-button"}
    >
      {isLoading ? "Sending..." : "Submit"}
    </button>
  ),
  RadioInput: ({
    name,
    value,
    checked,
    onChange,
    radioText,
    disabled,
    "data-testid": dataTestId,
    ...props
  }: any) => (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        data-testid={dataTestId}
        {...props}
      />
      {radioText}
    </label>
  ),
  RadioGroup: ({ formGroupLabel, children }: any) => (
    <fieldset>
      <legend>{formGroupLabel}</legend>
      {children}
    </fieldset>
  ),
}));

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("EnquiryForm Component", () => {
  const mockSendEmail = require("../serveractions").sendEmail;
  const mockSanitiseAndValidate =
    require("@/app/utils/sanitiseInput").sanitiseAndValidate;
  const mockToast = require("react-hot-toast").default;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSanitiseAndValidate.mockReturnValue({});
  });

  describe("rendering", () => {
    it("renders the form with all required fields", () => {
      render(<EnquiryForm />);

      expect(screen.getByTestId("enquiry-form")).toBeInTheDocument();
      expect(screen.getByTestId("student-name-input")).toBeInTheDocument();
      expect(screen.getByTestId("parent-name-input")).toBeInTheDocument();
      expect(screen.getByTestId("parent-phone-input")).toBeInTheDocument();
      expect(screen.getByTestId("parent-email-input")).toBeInTheDocument();
      expect(screen.getByTestId("subjects-input")).toBeInTheDocument();
      expect(screen.getByTestId("current-school-input")).toBeInTheDocument();
      expect(screen.getByTestId("year-group-input")).toBeInTheDocument();
      expect(screen.getByTestId("message-input")).toBeInTheDocument();
      expect(screen.getByTestId("availability-input")).toBeInTheDocument();
    });

    it("renders radio buttons for tutoring preference", () => {
      render(<EnquiryForm />);

      expect(screen.getByTestId("tutoring-1to1")).toBeInTheDocument();
      expect(screen.getByTestId("tutoring-group")).toBeInTheDocument();
      expect(screen.getByText("1:1")).toBeInTheDocument();
      expect(screen.getByText("Group (up to 8 students)")).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<EnquiryForm />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent("Submit");
    });

    it("initializes with empty form data", () => {
      render(<EnquiryForm />);

      // Check that all inputs have empty values
      const inputs = screen.getAllByDisplayValue("");
      expect(inputs.length).toBeGreaterThan(0);
    });
  });

  describe("form interactions", () => {
    it("updates form data when user types in text inputs", () => {
      render(<EnquiryForm />);

      const studentNameInput = screen.getByTestId("student-name-input");
      fireEvent.change(studentNameInput, { target: { value: "John Doe" } });

      expect(studentNameInput).toHaveValue("John Doe");
    });

    it("updates form data when user types in textarea", () => {
      render(<EnquiryForm />);

      const messageInput = screen.getByTestId("message-input");
      fireEvent.change(messageInput, { target: { value: "Test message" } });

      expect(messageInput).toHaveValue("Test message");
    });

    it("updates tutoring preference when radio button is selected", () => {
      render(<EnquiryForm />);

      const groupRadio = screen.getByTestId("tutoring-group");
      fireEvent.click(groupRadio);

      expect(groupRadio).toBeChecked();
    });

    it("clears error when user starts typing in a field with error", () => {
      mockSanitiseAndValidate.mockReturnValue({
        studentName: "Student name is required",
      });

      render(<EnquiryForm />);

      // Submit form to trigger validation
      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      // Check error is shown
      expect(screen.getByTestId("text-input-error")).toBeInTheDocument();

      // Start typing in the field with error
      const studentNameInput = screen.getByTestId("student-name-input");
      fireEvent.change(studentNameInput, { target: { value: "J" } });

      // Error should be cleared
      expect(screen.queryByTestId("text-input-error")).not.toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("shows validation errors when form is submitted with invalid data", async () => {
      const validationErrors = {
        studentName: "Student name must be at least 2 characters",
        parentEmail: "Please enter a valid email address",
      };
      mockSanitiseAndValidate.mockReturnValue(validationErrors);

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSanitiseAndValidate).toHaveBeenCalled();
        expect(mockToast.error).toHaveBeenCalledWith(
          "Please fix the errors in the form"
        );
      });
    });

    it("does not submit form when validation fails", async () => {
      const validationErrors = {
        studentName: "Student name is required",
      };
      mockSanitiseAndValidate.mockReturnValue(validationErrors);

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSendEmail).not.toHaveBeenCalled();
      });
    });
  });

  describe("form submission", () => {
    it("submits form successfully with valid data", async () => {
      mockSendEmail.mockResolvedValue(undefined);
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      // Fill in some form data
      const studentNameInput = screen.getByTestId("student-name-input");
      const parentEmailInput = screen.getByTestId("parent-email-input");

      fireEvent.change(studentNameInput, { target: { value: "John Doe" } });
      fireEvent.change(parentEmailInput, {
        target: { value: "parent@example.com" },
      });

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            studentName: "John Doe",
            parentEmail: "parent@example.com",
          })
        );
        expect(mockToast.success).toHaveBeenCalledWith(
          "Thank you for your enquiry. We will be in touch shortly."
        );
      });
    });

    it("resets form data after successful submission", async () => {
      mockSendEmail.mockResolvedValue(undefined);
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      // Fill in form data
      const studentNameInput = screen.getByTestId("student-name-input");
      fireEvent.change(studentNameInput, { target: { value: "John Doe" } });

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(studentNameInput).toHaveValue("");
      });
    });

    it("handles submission error", async () => {
      const error = new Error("Network error");
      mockSendEmail.mockRejectedValue(error);
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          "Failed to send enquiry. Please try again later."
        );
      });
    });
  });

  describe("loading states", () => {
    it("shows loading state during form submission", async () => {
      // Mock a delayed response
      mockSendEmail.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      // Check that submit button shows loading state
      expect(screen.getByText("Sending...")).toBeInTheDocument();
    });

    it("disables form inputs during loading", async () => {
      mockSendEmail.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      // Check that inputs are disabled
      expect(screen.getByTestId("student-name-input")).toBeDisabled();
      expect(screen.getByTestId("parent-name-input")).toBeDisabled();
      expect(screen.getByTestId("tutoring-1to1")).toBeDisabled();
    });

    it("re-enables form inputs after submission completes", async () => {
      mockSendEmail.mockResolvedValue(undefined);
      mockSanitiseAndValidate.mockReturnValue({});

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByTestId("student-name-input")).not.toBeDisabled();
        expect(screen.getByTestId("parent-name-input")).not.toBeDisabled();
        expect(screen.getByTestId("tutoring-1to1")).not.toBeDisabled();
      });
    });
  });

  describe("form field types and attributes", () => {
    it("renders phone input with correct type", () => {
      render(<EnquiryForm />);

      const phoneInput = screen.getByTestId("parent-phone-input");
      expect(phoneInput).toHaveAttribute("type", "tel");
    });

    it("renders email input with correct type", () => {
      render(<EnquiryForm />);

      const emailInput = screen.getByTestId("parent-email-input");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("marks required fields as required", () => {
      render(<EnquiryForm />);

      const requiredInputs = [
        "student-name-input",
        "parent-name-input",
        "parent-phone-input",
        "parent-email-input",
        "subjects-input",
        "current-school-input",
        "year-group-input",
        "message-input",
        "availability-input",
      ];

      requiredInputs.forEach((testId) => {
        const input = screen.getByTestId(testId);
        expect(input).toBeRequired();
      });
    });
  });

  describe("error handling", () => {
    it("displays error messages for invalid fields", () => {
      const validationErrors = {
        studentName: "Student name is required",
        parentEmail: "Invalid email format",
      };
      mockSanitiseAndValidate.mockReturnValue(validationErrors);

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      expect(screen.getByText("Student name is required")).toBeInTheDocument();
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    it("applies error styling to invalid fields", () => {
      const validationErrors = {
        studentName: "Student name is required",
      };
      mockSanitiseAndValidate.mockReturnValue(validationErrors);

      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      fireEvent.submit(form);

      const studentNameInput = screen.getByTestId("student-name-input");
      expect(studentNameInput).toHaveClass("border-red-500");
    });
  });

  describe("form accessibility", () => {
    it("has proper form structure", () => {
      render(<EnquiryForm />);

      const form = screen.getByTestId("enquiry-form");
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");
    });

    it("has proper labels for all inputs", () => {
      render(<EnquiryForm />);

      const labels = [
        "Student's Name",
        "Parent's Name",
        "Parent's Phone Number",
        "Parent's Email",
        "Subjects",
        "Current School",
        "Year Group",
        "Message",
        "What is your availability for sessions?",
      ];

      labels.forEach((labelText) => {
        expect(screen.getByText(labelText)).toBeInTheDocument();
      });
    });

    it("has proper fieldset for radio buttons", () => {
      render(<EnquiryForm />);

      expect(screen.getByText("Tuition Setting")).toBeInTheDocument();
    });
  });
});
