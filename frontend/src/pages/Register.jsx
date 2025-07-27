import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
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

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;