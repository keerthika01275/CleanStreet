
import React,{useState} from "react";
import axios from "axios";

export default function Report(){
 const [title,setTitle]=useState("");
 const [desc,setDesc]=useState("");
 const user = JSON.parse(localStorage.getItem("user"));

 const submit=async()=>{
  await axios.post("http://localhost:5000/api/complaint",
  {user_id:user.id,title,description:desc,address:"demo",coords:"0,0"});
  alert("Complaint Added");
 };

 return(
  <div>
   <h2>Report Issue</h2>
   <input placeholder="title" onChange={e=>setTitle(e.target.value)}/>
   <textarea onChange={e=>setDesc(e.target.value)}/>
   <button onClick={submit}>Submit</button>
  </div>
 );
}
