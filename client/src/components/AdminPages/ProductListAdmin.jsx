import ProductAdmin from "./ProductAdmin";

import "../Catalog/Catalog.css";

export default function ProductListAdmin({ products }) {
  return (
    <ul className="productItem">
      {products?.length === 0 && (
        <p style={{ textAlign: "center", width: "100%" }}>No products found!</p>
      )}
      {products?.map((product) => (
        <ProductAdmin key={product._id} product={product} />
      ))}
    </ul>
  );
}
