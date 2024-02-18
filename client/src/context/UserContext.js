import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigator = useNavigate();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      fetch(BASE_URL + "/users/" + userEmail).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data.user);
          });
        } else {
          localStorage.removeItem("userEmail");
        }
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(BASE_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      localStorage.setItem("userEmail", data.user.email);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.error("login failed", error);
      toast.error("login failed: password or email is not corrcet");
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
  };
  const signUp = async (name, email, password) => {
    const userData = {
      email: email,
      password: password,
      name: name,
      role: "user",
      cart: [],
    };
    try {
      const response = await fetch(BASE_URL + "/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("User created successfully!");
        navigator("/login");
      } else {
        console.error("User created failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };
  const addToCart = async (item) => {
    if (!user?._id) {
      toast.error("Please login to add to cart");

      return;
    }
    try {
      const response = await fetch(BASE_URL + "/users/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, item }),
      });
      const data = await response.json();
      setUser(data.updatedUser);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart: " + error.message);
    }
  };
  const addQuantityToCart = async (item) => {
    try {
      const response = await fetch(BASE_URL + "/users/updatequantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ userId: user._id, item }),
      });
      const data = await response.json();

      setUser(data.updatedUser);
      toast.success("Updated the cart successfully!");
    } catch (error) {
      console.error("Error update the cart:", error);
      alert("Error updating the quantity: " + error.message);
    }
  };

  const removeQuantityInCart = async (item) => {
    try {
      const response = await fetch(BASE_URL + "/users/removequantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ userId: user._id, item }),
      });
      const data = await response.json();

      setUser(data.updatedUser);
      toast.success("Updated the cart successfully!");
    } catch (error) {
      console.error("Error update the cart:", error);
      alert("Error updating the quantity: " + error.message);
    }
  };
  const removeItemFromCart = async (item) => {
    try {
      const response = await fetch(BASE_URL + "/users/removeitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, item }),
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.updatedUser);
        toast.success("Remove item successfully!");
      } else {
        alert("Error removing item from cart: " + data.message);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Error removing item from cart: " + error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        totalPrice,
        setTotalPrice,
        signUp,
        login,
        logout,
        addToCart,
        addQuantityToCart,
        removeQuantityInCart,
        removeItemFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User context not provided");
  }
  return context;
};
