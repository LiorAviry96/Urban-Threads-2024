import Product from "./Product";
import "./Catalog.css";

export default function ProductList({ products }) {
  return (
    <ul className="productItem">
      {products?.length === 0 && (
        <p style={{ textAlign: "center", width: "100%" }}>No products found!</p>
      )}
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </ul>
  );
}
