import UISlice, { toggleMobileMenu } from "../UI";
import { InitialStateType } from "@/app/types";

describe("UI Slice", () => {
  const initialState: InitialStateType = {
    isMobileMenuOpen: false,
    isOverlayVisible: false,
  };

  describe("toggleMobileMenu", () => {
    it("should set both isMobileMenuOpen and isOverlayVisible to true when visible is true", () => {
      const action = toggleMobileMenu({ visible: true });
      const newState = UISlice(initialState, action);

      expect(newState.isMobileMenuOpen).toBe(true);
      expect(newState.isOverlayVisible).toBe(true);
    });

    it("should set both isMobileMenuOpen and isOverlayVisible to false when visible is false", () => {
      const action = toggleMobileMenu({ visible: false });
      const newState = UISlice(initialState, action);

      expect(newState.isMobileMenuOpen).toBe(false);
      expect(newState.isOverlayVisible).toBe(false);
    });

    it("should toggle state correctly from true to false", () => {
      const currentState: InitialStateType = {
        isMobileMenuOpen: true,
        isOverlayVisible: true,
      };

      const action = toggleMobileMenu({ visible: false });
      const newState = UISlice(currentState, action);

      expect(newState.isMobileMenuOpen).toBe(false);
      expect(newState.isOverlayVisible).toBe(false);
    });

    it("should toggle state correctly from false to true", () => {
      const currentState: InitialStateType = {
        isMobileMenuOpen: false,
        isOverlayVisible: false,
      };

      const action = toggleMobileMenu({ visible: true });
      const newState = UISlice(currentState, action);

      expect(newState.isMobileMenuOpen).toBe(true);
      expect(newState.isOverlayVisible).toBe(true);
    });
  });
});
