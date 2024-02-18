import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Catalog.css";

export default function Product({ product }) {
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
        <Button>
          <Link className="viewDetails" to={`/product/${product._id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </li>
  );
}
