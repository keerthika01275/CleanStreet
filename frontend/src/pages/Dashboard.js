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

  /* ===== CALCULATIONS ===== */
  const total = list.length;
  const pending = list.filter(c=>c.status==="received").length;
  const progress = list.filter(c=>c.status==="in progress").length;
  const resolved = list.filter(c=>c.status==="resolved").length;

  return(
    <>
      <Navbar/>

      <div style={{padding:"30px"}}>

        <h2 style={{color:"white"}}>User Dashboard</h2>

        {/* ===== STATUS CARDS ===== */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
          gap:"20px",
          marginTop:"20px"
        }}>
          <Card title="Total Issues" value={total}/>
          <Card title="Pending" value={pending}/>
          <Card title="In Progress" value={progress}/>
          <Card title="Resolved" value={resolved}/>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"2fr 1fr",
          gap:"20px",
          marginTop:"30px"
        }}>

          {/* ===== RECENT ACTIVITY ===== */}
          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
          }}>
            <h3>Recent Activity</h3>

            {list.slice(0,3).map(c=>(
              <div key={c._id} style={{marginTop:"15px"}}>
                <b>{c.title}</b>
                <p style={{fontSize:"13px",color:"gray"}}>
                  Status: {c.status}
                </p>
              </div>
            ))}

            {list.length===0 && <p>No activity yet 😢</p>}
          </div>

          {/* ===== QUICK ACTIONS ===== */}
          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
          }}>
            <h3>Quick Actions</h3>

            <button style={btnBlue}
              onClick={()=>nav("/report")}>
              + Report New Issue
            </button>

            <button style={btnLight}
              onClick={()=>nav("/view")}>
              View All Complaints
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

/* ===== SMALL CARD COMPONENT ===== */
function Card({title,value}){
 return(
  <div style={{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    textAlign:"center",
    boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
  }}>
    <h1>{value}</h1>
    <p>{title}</p>
  </div>
 );
}

const btnBlue={
 width:"100%",
 padding:"12px",
 marginTop:"15px",
 background:"#2d6cdf",
 color:"white",
 border:"none",
 borderRadius:"6px",
 cursor:"pointer"
};

const btnLight={
 width:"100%",
 padding:"12px",
 marginTop:"10px",
 background:"#eee",
 border:"none",
 borderRadius:"6px",
 cursor:"pointer"
};