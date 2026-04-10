import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authService } from "../services/authService";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {

    if (
      email === "admin@tshirtshop.com" &&
      password === "admin123"
    ) {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <>
    <Navbar/>
    <main className="container">
    <div className="container">

      <h3>Admin Login</h3>

      <input
        className="input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={login}>
        Login
      </button>

    </div>
    </main>
    </>
  );
}

export default AdminLogin;