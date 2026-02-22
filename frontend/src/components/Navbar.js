import React,{useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar(){

 const nav = useNavigate();
 const loc = useLocation();
 const [open,setOpen] = useState(false);

 const userData = localStorage.getItem("user");
 const user = userData ? JSON.parse(userData) : null;

 const active = (path) => ({
   cursor:"pointer",
   fontWeight: loc.pathname === path ? "bold" : "normal",
   color: loc.pathname === path ? "#2d6cdf" : "black"
 });

 // avatar letter
 const avatar = user?.name ? user.name.charAt(0).toUpperCase() : "U";

 return(
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"15px 30px",
    background:"#f5f5f5",
    borderBottom:"1px solid #ddd",
    position:"relative"
  }}>

   {/* LEFT LOGO */}
   <h2 style={{color:"#2d6cdf",cursor:"pointer"}}
       onClick={()=>nav("/")}>
     CleanStreet
   </h2>

   {/* CENTER LINKS */}
   <div style={{display:"flex",gap:"25px"}}>
     <span style={active("/dashboard")} onClick={()=>nav("/dashboard")}>
       Dashboard
     </span>

     <span style={active("/report")} onClick={()=>nav("/report")}>
       Report Issue
     </span>

     <span style={active("/view")} onClick={()=>nav("/view")}>
       View Complaints
     </span>
   </div>

   {/* RIGHT SIDE */}
   <div style={{position:"relative"}}>

     {!user ? (
       <>
        <button onClick={()=>nav("/")}>Login</button>
        <button style={{marginLeft:"10px"}}
                onClick={()=>nav("/register")}>
         Register
        </button>
       </>
     ) : (
       <>
         {/* AVATAR */}
         <div
           onClick={()=>setOpen(!open)}
           style={{
             width:"40px",
             height:"40px",
             borderRadius:"50%",
             background:"#2d6cdf",
             color:"white",
             display:"flex",
             alignItems:"center",
             justifyContent:"center",
             cursor:"pointer",
             fontWeight:"bold"
           }}
         >
           {avatar}
         </div>

         {/* DROPDOWN */}
         {open && (
           <div style={{
             position:"absolute",
             right:0,
             top:"50px",
             background:"white",
             border:"1px solid #ddd",
             borderRadius:"8px",
             padding:"10px",
             width:"150px",
             boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
           }}>
             <div style={{padding:"8px",cursor:"pointer"}}
                  onClick={()=>nav("/profile")}>
               👤 Profile
             </div>

             <div style={{padding:"8px",cursor:"pointer"}}
                  onClick={()=>nav("/security")}>
               🔐 Security
             </div>

             <hr/>

             <div style={{padding:"8px",cursor:"pointer",color:"red"}}
                  onClick={()=>{
                    localStorage.removeItem("user");
                    nav("/");
                  }}>
               Logout
             </div>
           </div>
         )}
       </>
     )}

   </div>

  </div>
 );
}