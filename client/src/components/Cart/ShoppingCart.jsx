import React from "react";
import "./ShoppingCart.css";
import { useProduct } from "../../context/ProductContext";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ShoppingCart() {
  const { getProductByVersionId } = useProduct();
  const {
    addQuantityToCart,
    removeQuantityInCart,
    removeItemFromCart,
    user,
    setTotalPrice,
  } = useUser();
  const cart = user?.cart ?? [];

  const calculateTotal = () => {
    let total = 0;

    cart.forEach((cartItem) => {
      const { product } = getProductByVersionId(cartItem.versionId);
      if (product) {
        total += product.price * cartItem.quantity;
      }
    });

    setTotalPrice(total);

    return total;
  };

  const addQuantityHandler = async (cartItem) => {
    try {
      await addQuantityToCart(cartItem);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  const subtractQuantityHandler = async (cartItem) => {
    try {
      await removeQuantityInCart(cartItem);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeItemHandler = async (versionId) => {
    try {
      await removeItemFromCart({ versionId });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <table className="shoppingCart">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem, index) => {
              const { product, version } = getProductByVersionId(
                cartItem.versionId
              );
              //console.log("version", version);
              //console.log("product", product);

              if (!product || !version) return null;
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{version.size}</td>
                  <td>{version.color}</td>
                  <td>{cartItem.quantity}</td>
                  <td>
                    <Button
                      className="updateQuantity"
                      onClick={() => addQuantityHandler(cartItem)}
                    >
                      +
                    </Button>
                    <Button
                      className="updateQuantity"
                      onClick={() => subtractQuantityHandler(cartItem)}
                    >
                      -
                    </Button>
                    <Button
                      className="updateQuantity"
                      onClick={() => removeItemHandler(version._id)}
                    >
                      remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <div>
          <h3 className="total">Total: ${calculateTotal()}</h3>

          <Button className="checkout">
            <Link className="checkout" to={`/checkout`}>
              Checkout
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
