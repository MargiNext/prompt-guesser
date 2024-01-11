// import { Provider } from "react-redux";
import React from 'react'
import { Provider } from 'react-redux'
import { store } from "./store";

export default function provide({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
