import React from "react";
import "./login.css";

export default function Profile(){
 return(
  <div className="center">
   <div className="card" style={{width:"600px"}}>
     <h2>Account Settings</h2>

     <h3>Personal Details</h3>

     <input placeholder="Full Name" />
     <input placeholder="Email" />
     <input placeholder="Location" />
     <input placeholder="Role" />

     <button className="login-btn">Save</button>
   </div>
  </div>
 );
}