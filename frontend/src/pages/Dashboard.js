import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [list,setList]=useState([]);
  const nav = useNavigate();

  useEffect(()=>{

    // ✅ if not logged in
    if(!user){
      alert("Please login first");
      nav("/");
      return;
    }

    axios.get("http://localhost:5000/api/myComplaints/"+user.id)
    .then(res=>setList(res.data))
    .catch(()=>alert("Error loading complaints"));

  },[]);

  return(
    <div>

      {/* ✅ NAVBAR */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"15px",
        background:"#eee"
      }}>
        <h3>CleanStreet</h3>

        <div>
          <button onClick={()=>nav("/report")}>Report Issue</button>
          <button onClick={()=>nav("/profile")}>Profile</button>
          <button onClick={()=>nav("/security")}>Security</button>
        </div>
      </div>

      {/* ✅ DASHBOARD CONTENT */}
      <h2>My Complaints</h2>

      {list.length === 0 && <p>No complaints yet</p>}

      {list.map(c=>(
        <div key={c.id}>
          <h4>{c.title}</h4>
          <p>Status: {c.status}</p>
        </div>
      ))}

    </div>
  );
}