import { render, fireEvent } from "@testing-library/react";
import Layout from "../Layout";
import { createMockStore } from "@/app/utils/tests/mock-store";
import { Provider } from "react-redux";

const renderLayout = (
  initialState = { UI: { isMobileMenuOpen: false, isOverlayVisible: false } }
) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      <Layout>
        <div>Test Content</div>
      </Layout>
    </Provider>
  );
};

describe("Layout Component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = renderLayout();
    const layout = getByTestId("layout");
    expect(layout).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const { getByText } = renderLayout();
    const childContent = getByText("Test Content");
    expect(childContent).toBeInTheDocument();
  });

  it("has the correct main section", () => {
    const { getByTestId } = renderLayout();
    const mainSection = getByTestId("layout-main");
    expect(mainSection).toBeInTheDocument();
  });

  it("has the correct children section", () => {
    const { getByTestId } = renderLayout();
    const childrenSection = getByTestId("layout-children");
    expect(childrenSection).toBeInTheDocument();
  });

  describe("Overlay behavior", () => {
    it("dispatches toggleMobileMenu action when overlay is clicked and visible", () => {
      const initialState = {
        UI: { isMobileMenuOpen: true, isOverlayVisible: true },
      };
      const store = createMockStore(initialState);
      const dispatchSpy = jest.spyOn(store, "dispatch");

      const { getByTestId } = render(
        <Provider store={store}>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </Provider>
      );
      const overlay = getByTestId("layout-overlay");

      fireEvent.click(overlay);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "UI/toggleMobileMenu",
        payload: { visible: false },
      });
    });

    it("does not show overlay when isOverlayVisible is false", () => {
      const { queryByTestId } = renderLayout();
      const overlay = queryByTestId("layout-overlay");
      expect(overlay).not.toBeInTheDocument();
    });

    it("shows overlay when isOverlayVisible is true", () => {
      const initialState = {
        UI: { isMobileMenuOpen: false, isOverlayVisible: true },
      };
      const { getByTestId } = renderLayout(initialState);
      const overlay = getByTestId("layout-overlay");
      expect(overlay).toBeInTheDocument();
    });
  });
});
