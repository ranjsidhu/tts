import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
// eslint-disable-next-line import/no-unused-modules
export type AppDispatch = typeof store.dispatch;
