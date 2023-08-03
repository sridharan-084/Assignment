import React, { useState, useContext } from "react";
import { AuthContext } from "../context/context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import "./LoginForm.css"; // Import custom CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // Default value for "Remember Me" checkbox
  });

  const { setUserEmail } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const result = await axios.post(
        "https://poised-ox-drawers.cyclic.cloud/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(result);
      localStorage.setItem("email", await JSON.stringify(result.data.email));
      localStorage.setItem(
        "accessToken",
        await JSON.stringify(result.data.accessToken)
      );
      setUserEmail(result.data.email);
      console.log(result.data.email);
      setFormData({
        email: "",
        password: "",
        rememberMe: false, // Default value for "Remember Me" checkbox
      });
      navigate("/subscribe");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="custom-container d-flex justify-content-center align-items-center vh-100 bg-info">
      <div className="col-lg-5  col-md-8 col-sm-10">
        <div className="card p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
