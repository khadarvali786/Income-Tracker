import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./SignupForm.css"; // Add this for custom CSS
import { fetchUserInformationThunk } from "../../Store";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleError = (err) => {
    toast.error(
      <div>
        <span style={{ marginRight: "10px" }}>🚫</span> {err}
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        icon: false,
      }
    );
  };

  const handleSuccess = (message) => {
    toast.success( <div>
      <span style={{ marginRight: "10px" }}>✅</span> {message}
    </div>,{
      position: "bottom-right",
      autoClose: 3000,
      icon: false,
    });
  };
  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    if (formData.password !== formData.confirmPassword) {
        handleError("Passwords do not match!");
        return;
      }
    try {
      const { data } = await axios.post(
        "https://income-tracker-server.onrender.com/signup",
        formData,
        { withCredentials: true }
      );
      console.log("data: " + JSON.stringify(data));
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
            dispatch(fetchUserInformationThunk());
          navigate("/");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h3 className="text-center mb-4">Sign Up</h3>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3 password-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="mb-3 password-field">
          <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group">
              <input
                type={passwordType}
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <i class="fa-solid fa-lock"></i>
                ) : (
                  <i class="fa-solid fa-lock-open"></i>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
          <span>
            Already have an account? <Link className="Link_redirect" to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
