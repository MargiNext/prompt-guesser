"use client";
// import { Provider } from "react-redux";
import { Provider } from 'react-redux'
import { store } from "./store";

export default function provide({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
