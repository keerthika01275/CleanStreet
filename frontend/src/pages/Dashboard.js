import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard(){

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [list,setList]=useState([]);
  const nav = useNavigate();

  useEffect(()=>{

    if(!user){
      alert("Please login first");
      nav("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/myComplaints/" + user._id)
      .then(res=>setList(res.data))
      .catch(()=>alert("Error loading complaints"));

  },[]);

  return(
    <>
      <Navbar/>

      <div style={{padding:"30px"}}>

        {/* HEADER */}
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          <h2>My Complaints</h2>

          <button
            style={{
              padding:"10px 15px",
              background:"#2d6cdf",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
            onClick={()=>nav("/report")}
          >
            + Report Issue
          </button>
        </div>

        {/* EMPTY */}
        {list.length === 0 && (
          <p style={{marginTop:"20px"}}>
            No complaints yet 😢
          </p>
        )}

        {/* LIST */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
          gap:"20px",
          marginTop:"20px"
        }}>

        {list.map(c=>(
          <div
            key={c._id}
            style={{
              background:"white",
              padding:"15px",
              borderRadius:"10px",
              boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
            }}
          >

            {/* PHOTO */}
            {c.photo && (
              <img
                src={"http://localhost:5000/uploads/" + c.photo}
                alt="complaint"
                style={{
                  width:"100%",
                  borderRadius:"8px",
                  marginBottom:"10px"
                }}
              />
            )}

            <h3>{c.title}</h3>

            <p><b>Status:</b> {c.status}</p>
            <p><b>Type:</b> {c.type}</p>
            <p><b>Priority:</b> {c.priority}</p>
            <p><b>Address:</b> {c.address}</p>

          </div>
        ))}

        </div>

      </div>
    </>
  );
}