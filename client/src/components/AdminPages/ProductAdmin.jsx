import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "../Catalog/Catalog.css";
import { useProduct } from "../../context/ProductContext";

export default function ProductAdmin({ product }) {
  const { deleteProduct } = useProduct();

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  return (
    <li key={product.name} className="productItem">
      <div className="imageContainer">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <div className="imageContainer">
          <img
            className="productImage"
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "150px" }}
          />
        </div>
        <p>{product.description}</p>
        <div>
          <Button
            className="deleteProduct"
            onClick={() => handleDelete(product._id)}
          >
            Delete Product
          </Button>
          <Link to={`/product/edit/${product._id}`}>
            <Button className="editProduct">Edit Product</Button>
          </Link>
        </div>
      </div>
    </li>
  );
}
