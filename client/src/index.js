import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./UserPages/contextApi/AuthContext";
import store from "./UserPages/Redux/Store";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
 // </React.StrictMode>
);
