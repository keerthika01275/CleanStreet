import React,{useEffect,useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ViewComplaints(){

 const [list,setList]=useState([]);

 useEffect(()=>{
  axios.get("http://localhost:5000/api/allComplaints")
  .then(res=>setList(res.data))
  .catch(()=>alert("Error loading complaints"));
 },[]);

 return(
 <>
 <Navbar/>

 <div style={{padding:"30px"}}>
   <h2 style={{textAlign:"center"}}>Community Reports</h2>
   <p style={{textAlign:"center"}}>
     Browse issues reported by the community and track their status.
   </p>

   <div style={{
     display:"grid",
     gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
     gap:"25px",
     marginTop:"30px"
   }}>

   {list.map(c=>(
     <div key={c._id}
       style={{
         background:"white",
         borderRadius:"12px",
         padding:"15px",
         boxShadow:"0 8px 20px rgba(0,0,0,0.1)"
       }}
     >

       {/* STATUS BADGE */}
       <span style={{
         padding:"5px 10px",
         background:c.status==="resolved"?"#4caf50":"#2d6cdf",
         color:"white",
         borderRadius:"20px",
         fontSize:"12px"
       }}>
         {c.status}
       </span>

       {/* PHOTO */}
       {c.photo && (
         <img
          src={"http://localhost:5000/uploads/"+c.photo}
          alt=""
          style={{
            width:"100%",
            borderRadius:"10px",
            marginTop:"10px"
          }}
         />
       )}

       <h3 style={{marginTop:"10px"}}>{c.title}</h3>
       <p>{c.description}</p>

       <p><b>📍</b> {c.address}</p>

       {/* PROGRESS BAR */}
       <div style={{
         height:"8px",
         background:"#ddd",
         borderRadius:"10px",
         marginTop:"10px"
       }}>
         <div style={{
           width:c.status==="resolved"?"100%":"50%",
           background:c.status==="resolved"?"#4caf50":"#2d6cdf",
           height:"100%",
           borderRadius:"10px"
         }}></div>
       </div>

     </div>
   ))}

   </div>
 </div>
 </>
 );
}