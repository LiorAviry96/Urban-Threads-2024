import "./User.css";
import "./Login.css";
import { useState } from "react";
import Button from "../Button/Button";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function Login() {
  const { login, user, logout } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        logout();
      } else if (email.trim() === "") {
        toast.error("User Name is missing");
      } else if (!email_pattern.test(email)) {
        toast.error("Email is not valid!");
      } else if (password.trim() === "") {
        toast.error("Password is missing");
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + error.message);
    }
  };
  return (
    <div className="loginContainer">
      <h2 className={`pageTitle ${user ? "logoutHeader" : "loginHeader"}`}>
        {user ? "Are you sure you want to log out?" : "Login"}
      </h2>
      <form className="loginForm" onSubmit={handleLogin}>
        {!user && (
          <>
            <label htmlFor="username">
              <b>Email Address:</b>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">
              <b>Password:</b>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <Button type="submit">{user ? "Log Out" : "Log In"}</Button>
      </form>
      {!user && (
        <p className="signup">
          Dont have a user yet?{" "}
          <Link to="/signup">
            <span>
              <b>Sign Up</b>
            </span>
          </Link>
        </p>
      )}
    </div>
  );
}
