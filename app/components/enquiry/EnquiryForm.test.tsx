import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import EnquiryForm from "./EnquiryForm";
import instance from "../../utils/instance";
import toast from "react-hot-toast";

// Mock the dependencies
jest.mock("../../utils/instance");
jest.mock("react-hot-toast");
jest.mock("@/app/utils/sanitiseInput", () => ({
  sanitiseAndValidate: jest.fn().mockImplementation((formData) => {
    const errors: Record<string, string> = {};
    if (!formData.studentName) errors.studentName = "Student name is required";
    if (!formData.parentName) errors.parentName = "Parent name is required";
    if (!formData.parentPhone) errors.parentPhone = "Phone number is required";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  }),
}));

describe("EnquiryForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<EnquiryForm />);

    expect(screen.getByTestId("enquiry-form")).toBeInTheDocument();
    expect(screen.getByTestId("student-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("parent-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("parent-phone-input")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("updates form values when user types", () => {
    render(<EnquiryForm />);

    const studentNameInput = screen.getByTestId("student-name-input");
    const parentNameInput = screen.getByTestId("parent-name-input");
    const parentPhoneInput = screen.getByTestId("parent-phone-input");
    const messageInput = screen.getByTestId("message-input");

    fireEvent.change(studentNameInput, { target: { value: "John Doe" } });
    fireEvent.change(parentNameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(parentPhoneInput, { target: { value: "07123456789" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    expect(studentNameInput).toHaveValue("John Doe");
    expect(parentNameInput).toHaveValue("Jane Doe");
    expect(parentPhoneInput).toHaveValue("07123456789");
    expect(messageInput).toHaveValue("Test message");
  });

  it("shows validation errors when form is submitted with empty fields", async () => {
    render(<EnquiryForm />);

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("student-name-error")).toBeInTheDocument();
      expect(screen.getByTestId("parent-name-error")).toBeInTheDocument();
      expect(screen.getByTestId("parent-phone-error")).toBeInTheDocument();
      expect(screen.getByTestId("message-error")).toBeInTheDocument();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the errors in the form"
    );
    expect(instance.post).not.toHaveBeenCalled();
  });

  it("clears error when user starts typing in a field with error", async () => {
    render(<EnquiryForm />);

    // Submit form to trigger errors
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("student-name-error")).toBeInTheDocument();
    });

    // Type in the field with error
    fireEvent.change(screen.getByTestId("student-name-input"), {
      target: { name: "studentName", value: "John Doe" },
    });

    // Error should be cleared
    expect(screen.queryByTestId("student-name-error")).not.toBeInTheDocument();
  });

  it("submits the form successfully when all fields are filled", async () => {
    (instance.post as jest.Mock).mockResolvedValueOnce({});

    render(<EnquiryForm />);

    fireEvent.change(screen.getByTestId("student-name-input"), {
      target: { name: "studentName", value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-name-input"), {
      target: { name: "parentName", value: "Jane Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-phone-input"), {
      target: { name: "parentPhone", value: "07123456789" },
    });
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalledWith("/enquiry/email", {
        studentName: "John Doe",
        parentName: "Jane Doe",
        parentPhone: "07123456789",
        message: "Test message",
      });
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Thank you for your enquiry. We will be in touch shortly."
    );

    // Form should be reset
    expect(screen.getByTestId("student-name-input")).toHaveValue("");
    expect(screen.getByTestId("parent-name-input")).toHaveValue("");
    expect(screen.getByTestId("parent-phone-input")).toHaveValue("");
    expect(screen.getByTestId("message-input")).toHaveValue("");
  });

  it("shows error toast when API call fails", async () => {
    console.error = jest.fn();
    (instance.post as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<EnquiryForm />);

    fireEvent.change(screen.getByTestId("student-name-input"), {
      target: { name: "studentName", value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-name-input"), {
      target: { name: "parentName", value: "Jane Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-phone-input"), {
      target: { name: "parentPhone", value: "07123456789" },
    });
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { name: "message", value: "Test message" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(instance.post).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to send enquiry. Please try again later."
      );
    });
  });

  it("disables form inputs and shows loading state during submission", async () => {
    // Create a promise that we can resolve manually to control the API call timing
    let resolvePromise: (value: unknown) => void;
    const apiPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (instance.post as jest.Mock).mockImplementationOnce(() => apiPromise);

    render(<EnquiryForm />);

    // Fill out the form
    fireEvent.change(screen.getByTestId("student-name-input"), {
      target: { name: "studentName", value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-name-input"), {
      target: { name: "parentName", value: "Jane Doe" },
    });
    fireEvent.change(screen.getByTestId("parent-phone-input"), {
      target: { name: "parentPhone", value: "07123456789" },
    });
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { name: "message", value: "Test message" },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId("submit-button"));

    // Check loading state
    expect(screen.getByTestId("submit-button")).toHaveTextContent("Sending...");
    expect(screen.getByTestId("student-name-input")).toBeDisabled();
    expect(screen.getByTestId("parent-name-input")).toBeDisabled();
    expect(screen.getByTestId("parent-phone-input")).toBeDisabled();
    expect(screen.getByTestId("message-input")).toBeDisabled();

    // Resolve the API call
    act(() => {
      resolvePromise({});
    });

    // Check that loading state is removed
    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).toHaveTextContent("Submit");
      expect(screen.getByTestId("student-name-input")).not.toBeDisabled();
    });
  });
});
