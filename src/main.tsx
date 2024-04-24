import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "./app/store.ts";
import { Root } from "./components/Root/Root.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Root />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
