import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    toggleMobileMenu: (state, action: PayloadAction<{ visible: boolean }>) => {
      state.isMobileMenuOpen = action.payload.visible;
    },
  },
});

// Create a mock store
const createMockStore = (
  initialState = { UI: { isMobileMenuOpen: false } }
) => {
  return configureStore({
    reducer: {
      UI: uiSlice.reducer,
    },
    preloadedState: initialState,
  });
};

export { createMockStore };
