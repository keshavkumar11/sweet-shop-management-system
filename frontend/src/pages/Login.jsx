import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css"
import { loginUser } from "../api/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const data = await loginUser(formData);
        localStorage.setItem("token",data.token);
        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        localStorage.setItem("role",decoded.role);
        navigate(decoded.role==="admin"?"/admin/dashboard":"/products")
    } catch (error) {
        alert(error.message)
    }
    
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
