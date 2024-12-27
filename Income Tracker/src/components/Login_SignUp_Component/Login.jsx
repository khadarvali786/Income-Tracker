import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { fetchUserInformationThunk } from "../../Store";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  //Toaster error message
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

  //Toaster success message
  const handleSuccess = (message) => {
    toast.success(
      <div>
        <span style={{ marginRight: "10px" }}>✅</span> {message}
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        icon: false,
      }
    );
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
    setIsLoading(true); // Start the loader

    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false); // Stop the loader on validation error
      handleError("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://income-tracker-server.onrender.com/login",
        formData,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        // Clear form fields
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        handleSuccess(message);
        setTimeout(() => {
          dispatch(fetchUserInformationThunk());
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop the loader after the request completes
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
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
                  <i className="fa-solid fa-lock"></i>
                ) : (
                  <i className="fa-solid fa-lock-open"></i>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p>
            Don't Have Account ?{" "}
            <Link to={"/signup"} className="Link_redirect">
              SignUp
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
