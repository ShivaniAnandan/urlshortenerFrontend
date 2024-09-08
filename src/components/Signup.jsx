import React, { useState } from "react";
import icon from "../images/icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import "./App.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://urlshortenerbackend-b9op.onrender.com/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
      });
      if (res.status === 201) {
        toast.success("User created successfully");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user. Please check the details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="login" style={{ height: "700px", paddingTop: "11px" }}>
        <div className="avatar" style={{ width: "100px", height: "100px" }}>
          <img src={icon} alt="Icon" />
        </div>
        <h2>Signup</h2>

        <h3>Welcome</h3>
        <form className="login-form" onSubmit={createUser}>
          <div className="textbox">
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span className="material-icons-outlined">account_circle</span>
          </div>

          <div className="textbox">
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className="material-icons-outlined">account_circle</span>
          </div>

          <div className="textbox">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="material-icons-outlined">email</span>
          </div>

          <div className="textbox">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              pattern=".{8,}"
              title="Password must be at least 8 characters"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="material-icons-outlined lock">lock</span>

            <div style={{ display: "flex" }}>
              <input
                style={{ width: "15px" }}
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <span
                style={{
                  paddingTop: "60px",
                  paddingLeft: "10px",
                  color: "#157ae1",
                }}
              >
                Show Password
              </span>
            </div>
          </div>

          <button type="submit">SIGNUP</button>

          <p style={{ color: "#157ae1", fontSize: "18px", marginTop: "4px" }}>
            Already have an account?&nbsp; &nbsp;
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
