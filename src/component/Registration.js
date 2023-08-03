import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// Import custom CSS file

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false, // Default value for "Remember Me" checkbox
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a checkbox, set its checked value to the state
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission here, e.g., send data to the server or validate the form.
    try {
      if (formData.name.length === 0 || formData.email.length === 0) {
        alert("Fill all the details");
      }
      const result = await axios.post(
        "https://poised-ox-drawers.cyclic.cloud/signup",
        {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(result);
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   rememberMe: false,
      // });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setFormData({
        name: "",
        email: "",
        password: "",
        rememberMe: false, // Default value for "Remember Me" checkbox
      });
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="custom-container d-flex justify-content-center align-items-center vh-100 bg-info">
        <div className="col-lg-5 col-md-8 col-sm-10">
          <div className="card p-4">
            <h3 className="text-center mb-4">Create Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>
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
                Register
              </button>
            </form>
            <div className="text-center mt-3">
              Already have account? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
