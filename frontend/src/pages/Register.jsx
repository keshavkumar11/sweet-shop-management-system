import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authService";
import "./../styles/Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      localStorage.setItem("role", decoded.role);
      navigate(decoded.role === "admin" ? "/admin/dashboard" : "/products");
      alert("Registered successfully. Please login");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
