import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// eslint-disable-next-line import/no-unused-modules
export type RootState = ReturnType<AppStore["getState"]>;
