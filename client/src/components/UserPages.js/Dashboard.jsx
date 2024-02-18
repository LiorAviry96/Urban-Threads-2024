import { useOrders } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import "./User.css";
import "./Dashboard.css";
export default function Dashboard() {
  const { orders } = useOrders();
  const { user } = useUser();

  return (
    <div className="dashboardContainer">
      <h2 className="pageTitleUser">My Orders</h2>

      {user ? (
        <h3 className="hello">Hello {user?.name || "USER"}</h3>
      ) : (
        <h3 className="hello">Hello GUEST</h3>
      )}
      {!user && <h3 className="hello">Please login to see dashboard</h3>}
      {orders?.length === 0 ? (
        <p>No past orders available.</p>
      ) : (
        <ul className="orderList">
          {orders?.map((order) => (
            <li key={order._id} className="orderItem">
              <h3 className="orderNumber">Order Number #{order._id}</h3>
              <p>
                <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Address: </b>
                {order.shippingAddress}
              </p>
              <p>
                <b>Total:</b> ${order.totalPrice.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
