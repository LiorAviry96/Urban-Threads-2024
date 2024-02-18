import "./App.css";
import { Routes, Route } from "react-router-dom";

import Catalog from "./components/Catalog/Catalog";
import Checkout from "./components/Checkout/Checkout";
import ShoppingCart from "./components/Cart/ShoppingCart";
import ConfirmPage from "./components/Checkout/ConfirmPage";
import ProductPage from "./components/Catalog/ProductPage";
import Login from "./components/UserPages.js/Login";
import Signup from "./components/UserPages.js/Signup";
import Dashboard from "./components/UserPages.js/Dashboard";
import Navbar from "./components/NavBar/Navbar";
import { AddEditProduct } from "./components/AdminPages/AddEditProduct";
import ManageProducts from "./components/AdminPages/ManageProducts";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Catalog />} index />

        <Route element={<AddEditProduct />} path="/product/create" />

        <Route element={<AddEditProduct />} path="/product/edit/:id" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ManageProducts />} path="/manage" />
        <Route element={<Dashboard />} path="/dashboard/:uid" />
        <Route element={<ProductPage />} path="/product/:id" />
        <Route element={<ShoppingCart />} path="/cart" />
        <Route element={<ConfirmPage />} path="/confirmation/:id" />
        <Route element={<Checkout />} path="/checkout" />
      </Routes>
    </div>
  );
}

export default App;
