// ---------------------------------------------------------------
//	_app.tsx
//
// ---------------------------------------------------------------

import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// ---------------------------------------------------------------
export type CounterState = {
  value: number;
};

// ---------------------------------------------------------------
const initialState: CounterState = { value: 0 };

// ---------------------------------------------------------------
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
});

// ---------------------------------------------------------------
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// ---------------------------------------------------------------
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
// ---------------------------------------------------------------
