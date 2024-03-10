import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./State/api.jsx";
import AuthSlice from "./State/AuthSlice.js";
import ChatSlice from "./State/ChatSlice.jsx";
import cartSlice from "./State/cartSlice.jsx";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    chat: ChatSlice,
    cart: cartSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
