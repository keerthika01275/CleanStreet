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

 const avatar = user?.name ? user.name.charAt(0).toUpperCase() : "U";

 return(
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"10px 24px",          // ✅ reduced
    background:"#f5f5f5",
    borderBottom:"1px solid #ddd",
    position:"relative"
  }}>

   {/* LEFT LOGO */}
   <h2
     style={{
       color:"#2d6cdf",
       cursor:"pointer",
       margin:0,                 // ✅ removes extra height
       fontSize:"20px"           // optional: slightly smaller
     }}
     onClick={()=>nav("/")}>
     CleanStreet
   </h2>

   {/* CENTER LINKS */}
   <div style={{display:"flex",gap:"28px"}}>
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
        <button style={{marginLeft:"8px"}}
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
    display:"flex",
    alignItems:"center",
    gap:"8px",
    cursor:"pointer"
  }}
>
   {/* AVATAR */}
  <div
    style={{
      width:"36px",
      height:"36px",
      borderRadius:"50%",
      background:"#2d6cdf",
      color:"white",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      fontWeight:"bold",
      fontSize:"14px"
    }}
  >
    {avatar}
  </div>
  {/* USER NAME */}
  <span
    style={{
      fontSize:"14px",
      fontWeight:500,
      maxWidth:"120px",
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis"
    }}
  >
    {user?.name}
  </span>

 
</div>

         {/* DROPDOWN */}
         {open && (
           <div style={{
             position:"absolute",
             right:0,
             top:"44px",           // adjusted for smaller navbar
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