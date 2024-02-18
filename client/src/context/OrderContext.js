import { BASE_URL } from "../constants";

import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const OrderContext = createContext(null);

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user, setUser, totalPrice } = useUser();
  const navigate = useNavigate();

  const userId = user?._id;

  const fetchOrders = async (userId) => {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`);
    const data = await response.json();
    setOrders(data.orders);
  };

  const getOrderbyOrderId = async (id) => {
    try {
      const response = await fetch(BASE_URL + `/orders/${id}`);
      const orderData = await response.json();
      return orderData;
    } catch (error) {
      console.error("Error fetching order data:", error);
      return null;
    }
  };
  const generateTransactionId = () => {
    const transactionId = uuidv4();

    return transactionId;
  };
  const createNewOrder = async (totalPrice, address) => {
    const orderData = {
      userId: user._id,
      shippingAddress: address,
      totalPrice: totalPrice,
      products: user.cart,
      transactionId: generateTransactionId(),
    };

    try {
      const response = await fetch(BASE_URL + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order placed successfully!", data.order);

        setUser(data.updatedUser);
        fetchOrders(userId);

        navigate(`/confirmation/${data.order._id}`);
      } else {
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrderbyOrderId,
        createNewOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("Order context not provided");
  }
  return context;
};
