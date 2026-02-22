import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Navbar from "../components/Navbar";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ check login
  const user = JSON.parse(localStorage.getItem("user"));

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location = "/dashboard";

    } catch {
      alert("Wrong email or password");
    }
  };

  return (
    <>
      {/* ✅ SHOW MAIN NAVBAR ONLY IF LOGGED IN */}
      {user && <Navbar/>}

      <div>

        {/* ✅ YOUR LOGIN NAVBAR (kept same) */}
        {!user && (
        <div className="navbar">
          <div className="logo">CleanStreet</div>

          <div className="menu">
            <span>Dashboard</span>
            <span>Report Issue</span>
            <span>View Complaints</span>
          </div>

          <div>
            <button className="btn-light">Login</button>
            <button
              className="btn-blue"
              onClick={() => window.location="/register"}
            >
              Register
            </button>
          </div>
        </div>
        )}

        {/* LOGIN CARD */}
        <div className="center">
          <div className="card">
            <h2>Login to CleanStreet</h2>

            <label>Email</label>
            <input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={login}>
              Login
            </button>

            <p className="link">
              Don't have an account?
              <span onClick={()=>window.location="/register"}>
                Register
              </span>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}