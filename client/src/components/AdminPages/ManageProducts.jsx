import { useProduct } from "../../context/ProductContext";
import ProductListAdmin from "./ProductListAdmin";
import "../Catalog/Catalog.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
export default function ManageProducts() {
  const { products } = useProduct();

  return (
    <div className="catalog">
      <h1 className="header">Manage Your Product</h1>
      <Link to="/product/create">
        <Button className="addNewProduct">Add new Product</Button>
      </Link>
      <ProductListAdmin products={products} />
    </div>
  );
}
