import { useState } from "react";
import Button from "../Button/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import "./Catalog.css";
import "./ProductPage.css";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { getProductById, deleteProduct } = useProduct();
  const { addToCart, isAdmin, user } = useUser();
  const product = getProductById(id);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handelAddToCart = () => {
    if (!user) {
      return toast.error("Please login to add to cart");
    }
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select color and size");
    }

    const itemStock = product.stock.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    );
    if (!itemStock || itemStock.quantity === 0) {
      return toast.error("Out of stock right now");
    }

    addToCart({
      versionId: itemStock._id,
      productId: product._id,
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const colors = [];
  const sizes = [];

  product.stock.forEach((productVersion) => {
    if (productVersion.quantity > 0) {
      colors.push(productVersion.color);
    }
  });

  const uniqueColors = [...new Set(colors)];
  product.stock.forEach((productVersion) => {
    if (productVersion.quantity > 0 && productVersion.color === selectedColor) {
      sizes.push(productVersion.size);
    }
  });
  const uniqueSizes = [...new Set(sizes)];

  return (
    <div>
      <h2 className="nameProduct">{product.name}</h2>
      <h3>${product.price}</h3>
      <img
        className="nameProductImg"
        src={product.image}
        width="250px"
        alt={product.name}
      />
      <p>{product.description}</p>

      <div>
        <h3>Available Options</h3>
        <div className="optionGroup">
          <div>
            <label>Select Color:</label>
            <select
              className="styleOption"
              name="color"
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select color</option>
              {uniqueColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <label>Select Size:</label>
            <select
              className="styleOption"
              name="size"
              onChange={(e) => setSelectedSize(e.target.value)}
              disabled={!selectedColor}
            >
              <option>Please select color</option>
              {uniqueSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Button className="addToCart" onClick={handelAddToCart}>
        Add to Cart
      </Button>
      {isAdmin && (
        <>
          <Link to={`/product/edit/${product._id}`}>
            <Button className="editProduct">Edit Product</Button>
          </Link>
          <Button
            className="deleteProduct"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
}
