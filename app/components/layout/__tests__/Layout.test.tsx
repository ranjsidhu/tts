import { render } from "@testing-library/react";
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
});
