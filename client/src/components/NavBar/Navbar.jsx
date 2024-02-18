import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const { user, isAdmin } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`menu-dropdown ${isMenuOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {user ? (
        <Link to="/login" onClick={toggleMenu}>
          Logout
        </Link>
      ) : (
        <Link to="/login" onClick={toggleMenu}>
          Log In
        </Link>
      )}

      {isAdmin && (
        <Link to="/product/create" onClick={toggleMenu}>
          Add New Product
        </Link>
      )}
      {isAdmin && (
        <Link to="/manage" onClick={toggleMenu}>
          Manage Poducts
        </Link>
      )}

      {user && (
        <Link to="/dashboard/:uid" onClick={toggleMenu}>
          Dashboard
        </Link>
      )}

      <Link to="/" onClick={toggleMenu}>
        Catalog
      </Link>
      <Link to="/cart" onClick={toggleMenu}>
        Cart
      </Link>
      <Link to="/checkout" onClick={toggleMenu}>
        Checkout
      </Link>
    </nav>
  );
}
