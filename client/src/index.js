import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { ProductContextProvider } from "./context/ProductContext";
import { OrderContextProvider } from "./context/OrderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ProductContextProvider>
        <OrderContextProvider>
          <App />
          <ToastContainer />
        </OrderContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
