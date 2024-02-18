import { useOrders } from "../../context/OrderContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Checkout.css";
import "./ConfirmPage.css";
export default function ConfirmPage() {
  const { getOrderbyOrderId } = useOrders();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderbyOrderId(id);
      setOrderDetails(data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmationPage">
      <h2 className="confirmationHeader">Order Confirmation</h2>

      <p>Thank you for your order! Your purchase details are as follows:</p>

      <div>
        <h3 className="orderHeaders">Order Summary</h3>
        <h4>Order number # {orderDetails._id}</h4>
      </div>

      <div>
        <h3>Shipping Details</h3>

        <p>{orderDetails.shippingAddress} </p>
      </div>
      <div>
        <h3>Order Items:</h3>
        <ul>
          {orderDetails.products.map((item, index) => (
            <li key={index}>
              <span className="itemId">
                <b>{item.versionId}</b>
              </span>
              <span className="itemId">Quantity: {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Total Amount</h3>
        <p>
          <b>${orderDetails.totalPrice.toFixed(2)}</b>
        </p>
      </div>

      <p className="confirm">Your order has been confirmed.</p>
    </div>
  );
}
