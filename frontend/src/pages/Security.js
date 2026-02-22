import React from "react";
import "./login.css";

export default function Security(){
 return(
  <div className="center">
   <div className="card" style={{width:"600px"}}>
     <h2>Change Password</h2>

     <input type="password" placeholder="Current Password" />
     <input type="password" placeholder="New Password" />
     <input type="password" placeholder="Confirm Password" />

     <button className="login-btn">Update Password</button>
   </div>
  </div>
 );
}