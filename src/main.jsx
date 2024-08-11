import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { PatientProvider } from "./context/context.jsx";
import "symphony-ui/Themes/index.scss";
import './themes/index.scss';
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PatientProvider>
        <App />
      </PatientProvider>
    </Provider>
);
