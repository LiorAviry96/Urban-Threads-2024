import "./Signup.css";
import { useState } from "react";
import Button from "../Button/Button";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Signup() {
  const { signUp, logout, user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        logout();
      } else if (name.trim() === "") {
        toast.error("Name is missing");
      } else if (email.trim() === "") {
        toast.error("Email Address is missing");
      } else if (!email_pattern.test(email)) {
        toast.error("Email is not valid!");
      } else if (password.trim() === "") {
        toast.error("Password is missing");
      } else if (password.trim() < 6) {
        toast.error("Password is should be 6 charecters minimum");
      } else {
        await signUp(name, email, password);
      }
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed: " + error.message);
    }
  };
  return (
    <div className="loginContainer">
      <h2 className="signUp">Sign Up</h2>
      <form className="loginForm" onSubmit={handleSignup}>
        <label htmlFor="name">
          <b>Full Name:</b>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">
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

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
