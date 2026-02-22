import React,{useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./report.css";

export default function Report(){

 const user = JSON.parse(localStorage.getItem("user"));

 const [title,setTitle]=useState("");
 const [type,setType]=useState("");
 const [priority,setPriority]=useState("");
 const [address,setAddress]=useState("");
 const [landmark,setLandmark]=useState("");
 const [desc,setDesc]=useState("");
 const [photo,setPhoto]=useState(null);
 const [preview,setPreview]=useState("");

 const submit=async()=>{

  if(!user){
   alert("Login first");
   return;
  }

  try{

   // ✅ FormData for photo upload
   const formData = new FormData();

   formData.append("userId", user._id);
   formData.append("title", title);
   formData.append("description", desc);
   formData.append("type", type);
   formData.append("priority", priority);
   formData.append("address", address);
   formData.append("landmark", landmark);
   if(photo) formData.append("photo", photo);

   await axios.post(
    "http://localhost:5000/api/complaint",
    formData,
    { headers:{ "Content-Type":"multipart/form-data" } }
   );

   alert("Complaint Added ✅");

  }catch(err){
   alert("Error submitting complaint");
   console.log(err);
  }
 };

 return(
 <>
 <Navbar/>

 <div className="report-container">

  <h2>Report an Issue</h2>
  <p>Help improve our community by reporting problems.</p>

  <div className="report-grid">

   {/* LEFT FORM */}
   <div className="report-form">

    <label>Issue Title</label>
    <input onChange={e=>setTitle(e.target.value)}
     placeholder="Overflowing garbage bin"/>

    <label>Issue Type</label>
    <select onChange={e=>setType(e.target.value)}>
      <option>Select</option>
      <option>Garbage</option>
      <option>Pothole</option>
      <option>Street Light</option>
      <option>Water Leakage</option>
    </select>

    <label>Priority Level</label>
    <select onChange={e=>setPriority(e.target.value)}>
      <option>Select</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <label>Full Address</label>
    <input onChange={e=>setAddress(e.target.value)}
     placeholder="12 Main Street"/>

    <label>Nearby Landmark</label>
    <input onChange={e=>setLandmark(e.target.value)}
     placeholder="Opposite Bus Stop"/>

    <label>Detailed Description</label>
    <textarea onChange={e=>setDesc(e.target.value)}
     placeholder="Explain the problem"/>


    {/* ✅ PHOTO UPLOAD */}
    <label>Attach Photo (Optional)</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e)=>{
        setPhoto(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
      }}
    />

    {/* ✅ Preview */}
    {preview && (
      <img
        src={preview}
        alt="preview"
        style={{width:"100%",marginTop:"10px",borderRadius:"10px"}}
      />
    )}

    <button className="submit-btn" onClick={submit}>
      Submit Complaint
    </button>

   </div>


   {/* RIGHT MAP */}
   <div className="map-box">
     <iframe
      title="map"
      src="https://maps.google.com/maps?q=karur&t=&z=13&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="400"
      style={{border:0}}
     />
     <p>Click on map to see location</p>
   </div>

  </div>

 </div>
 </>
 );
}