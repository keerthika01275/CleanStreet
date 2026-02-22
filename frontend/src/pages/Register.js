import React, { useState } from "react";
import axios from "axios";
import "./login.css";

export default function Register() {
  const [name,setName]=useState("");
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");

  const register = async () => {
    try{
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password
      });
      alert("Registered Successfully");
      window.location="/";
    }catch{
      alert("Error registering");
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">CleanStreet</div>

        <div className="menu">
          <span>Dashboard</span>
          <span>Report Issue</span>
          <span>View Complaints</span>
        </div>

        <div>
          <button className="btn-light" onClick={()=>window.location="/"}>
            Login
          </button>
          <button className="btn-blue">Register</button>
        </div>
      </div>

      {/* CARD */}
      <div className="center">
        <div className="card">
          <h2>Register for CleanStreet</h2>

          <label>Full Name</label>
          <input
            placeholder="Enter your full name"
            onChange={e=>setName(e.target.value)}
          />

          <label>Username</label>
          <input
            placeholder="Choose a username"
            onChange={e=>setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            placeholder="Enter your email"
            onChange={e=>setEmail(e.target.value)}
          />

          <label>Phone Number (Optional)</label>
          <input
            placeholder="Enter your phone number"
            onChange={e=>setPhone(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            onChange={e=>setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={register}>
            Register
          </button>

          <p className="link">
            Already have an account?
            <span onClick={()=>window.location="/"}> Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}