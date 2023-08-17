import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./slices/coins";

const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
