import { useState } from "react";
import "./Checkout.css";
import Button from "../Button/Button";
import { validateCheckoutForm } from "../../util/Validation";
import { useUser } from "../../context/UserContext";
import { useOrders } from "../../context/OrderContext";
import { Link } from "react-router-dom";
export default function Checkout() {
  const { totalPrice } = useUser();

  const { createNewOrder } = useOrders();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    street: "",
    houseNumber: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    id: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  function changeInputHandler(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateCheckoutForm(formData);

    if (Object.keys(errors).length !== 0) {
      setErrors(errors);

      return setErrors(errors);
    } else {
      setErrors({});
      const address =
        formData.street +
        " " +
        formData.houseNumber +
        ", " +
        formData.city +
        ", " +
        formData.country +
        ", " +
        formData.zipCode;

      createNewOrder(totalPrice, address);
    }
  };

  return (
    <div>
      {totalPrice === 0 ? (
        <div>
          <p className="emptyCart">
            Sorry! Your Cart is still empty, you can't checkout yet please go
            back to the Catalog page
          </p>
          <Link to={"/"}>
            <Button className="catalogPage">Catalog Page</Button>
          </Link>
        </div>
      ) : (
        <>
          <h2>Shipping Details</h2>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="shippingForm">
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  onChange={changeInputHandler}
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={changeInputHandler}
                ></input>
                {errors.street && <p className="error">{errors.street}</p>}
              </label>
              <label>
                Phone Number
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="0000000000"
                  onChange={changeInputHandler}
                ></input>
                {errors.phoneNumber && (
                  <p className="error">{errors.phoneNumber}</p>
                )}
              </label>
              <label>
                Street
                <input
                  type="text"
                  name="street"
                  onChange={changeInputHandler}
                ></input>
                {errors.street && <p className="error">{errors.street}</p>}
              </label>
              <label>
                House Number
                <input
                  type="text"
                  name="houseNumber"
                  onChange={changeInputHandler}
                ></input>
                {errors.houseNumber && (
                  <p className="error">{errors.houseNumber}</p>
                )}
              </label>
              <label>
                City
                <input
                  type="text"
                  name="city"
                  onChange={changeInputHandler}
                ></input>
                {errors.city && <p className="error">{errors.city}</p>}
              </label>
              <label>
                Country
                <input
                  type="text"
                  name="country"
                  onChange={changeInputHandler}
                ></input>
                {errors.country && <p className="error">{errors.country}</p>}
              </label>
              <label>
                Zip Code
                <input
                  type="text"
                  name="zipCode"
                  onChange={changeInputHandler}
                ></input>
                {errors.zipCode && <p className="error">{errors.zipCode}</p>}
              </label>
            </div>

            <div className="paymentForm">
              <h2 className="paymentHeader">Payments Details</h2>
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              <label>
                Card Number
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="0000-0000-0000-0000"
                  onChange={changeInputHandler}
                ></input>
                {errors.cardNumber && (
                  <p className="error">{errors.cardNumber}</p>
                )}
              </label>

              <div className="expirationContainer">
                <div className="expirationInput">
                  <label className="expirationHeader">Expiration Year</label>
                  <select className="select">
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                    <option>2030</option>
                  </select>
                </div>
                <div className="expirationInput">
                  <label className="expirationHeader">Expiration Month</label>
                  <select className="select">
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
              </div>

              {errors.expirationDate && (
                <p className="error">{errors.expirationDate}</p>
              )}

              <label>
                ID Number
                <input
                  type="text"
                  placeholder="000000000"
                  name="id"
                  onChange={changeInputHandler}
                ></input>
                {errors.id && <p className="error">{errors.id}</p>}
              </label>

              <label>
                CVV
                <input
                  type="number"
                  placeholder="000"
                  name="cvv"
                  onChange={changeInputHandler}
                ></input>
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </label>
            </div>

            <Button type="submit" className="placeOrder">
              Place Order
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
