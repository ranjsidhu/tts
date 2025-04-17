import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "./Footer";
import instance from "@/app/utils/instance";
import toast from "react-hot-toast";

// Mock the instance and toast
jest.mock("@/app/utils/instance");
jest.mock("react-hot-toast");
jest.mock("console");

describe("Footer Component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Footer />);
    const footerElement = getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });

  it("contains the correct text", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Contact Us")).toBeInTheDocument();
    expect(getByText("Key Information")).toBeInTheDocument();
    expect(getByText("Opening Hours")).toBeInTheDocument();
  });

  describe("Enquiry Form", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("shows error when submitting empty email", async () => {
      render(<Footer />);

      const emailInput = screen.getByTestId("footer-email-input");
      const submitButton = screen.getByTestId("footer-submit-button");

      fireEvent.change(emailInput, { target: { value: " " } });
      fireEvent.click(submitButton);

      expect(toast.error).toHaveBeenCalledWith("Invalid email format");
    });

    it("shows error when submitting invalid email format", async () => {
      render(<Footer />);

      const emailInput = screen.getByTestId("footer-email-input");
      const submitButton = screen.getByTestId("footer-submit-button");

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(submitButton);

      expect(toast.error).toHaveBeenCalledWith("Invalid email format");
    });

    it("successfully submits valid email", async () => {
      (instance.post as jest.Mock).mockResolvedValueOnce({});
      render(<Footer />);

      const emailInput = screen.getByTestId("footer-email-input");
      const submitButton = screen.getByTestId("footer-submit-button");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(instance.post).toHaveBeenCalledWith("/enquiry/consultation", {
          email: "test@example.com",
        });
        expect(toast.success).toHaveBeenCalledWith(
          "Thank you for your enquiry. We will be in touch shortly."
        );
        expect(toast.success).toHaveBeenCalledWith("We'll be in touch soon!", {
          icon: "✉️",
        });
        expect(emailInput).toHaveValue("");
      });
    });

    it("handles API error gracefully", async () => {
      console.error = jest.fn();
      (instance.post as jest.Mock).mockRejectedValueOnce(
        new Error("API Error")
      );
      render(<Footer />);

      const emailInput = screen.getByTestId("footer-email-input");
      const submitButton = screen.getByTestId("footer-submit-button");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Failed to submit. Please try again."
        );
      });
    });
  });
});
