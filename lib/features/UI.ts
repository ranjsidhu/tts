import { createSlice } from "@reduxjs/toolkit";
import type { InitialStateType } from "@/app/types";

const initialState: InitialStateType = {
  isMobileMenuOpen: false,
  isOverlayVisible: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleMobileMenu(state, action) {
      const { visible } = action.payload;
      state.isMobileMenuOpen = visible;
      state.isOverlayVisible = visible;
    },
  },
});

export const { toggleMobileMenu } = UISlice.actions;

export default UISlice.reducer;
