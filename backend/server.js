require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

/* ========= CONNECT MONGODB ========= */
mongoose.connect(
"mongodb+srv://keerthika15122005_db_user:keerthi123%40@cluster0.koa92ls.mongodb.net/cleanstreet",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)
.then(()=>console.log("✅ MongoDB Connected"))
.catch(err=>console.log("❌ Mongo Error:", err));
/* ========= SCHEMAS ========= */
const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true},
  password:String
});

const complaintSchema = new mongoose.Schema({
  userId:String,
  title:String,
  description:String,
  status:{type:String, default:"received"},
  createdAt:{type:Date, default:Date.now}
});

const User = mongoose.model("User", userSchema);
const Complaint = mongoose.model("Complaint", complaintSchema);

/* ========= REGISTER ========= */
app.post("/api/register", async(req,res)=>{
 try{
   const {name,email,password} = req.body;

   if(!name || !email || !password)
     return res.status(400).send("All fields required");

   const existing = await User.findOne({email});
   if(existing)
     return res.status(400).send("User already exists");

   const hash = await bcrypt.hash(password,10);

   await User.create({name,email,password:hash});

   res.send("✅ Registered Successfully");
 }catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= LOGIN ========= */
app.post("/api/login", async(req,res)=>{
 try{
   const {email,password} = req.body;

   const user = await User.findOne({email});
   if(!user) return res.status(400).send("No user");

   const ok = await bcrypt.compare(password,user.password);
   if(!ok) return res.status(400).send("Wrong password");

   res.json({user});
 }catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= ADD COMPLAINT ========= */
app.post("/api/complaint", async(req,res)=>{
 try{
   const {userId,title,description} = req.body;

   if(!userId || !title)
     return res.status(400).send("Missing fields");

   await Complaint.create({userId,title,description});

   res.send("✅ Complaint Added");
 }catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= GET MY COMPLAINTS ========= */
app.get("/api/myComplaints/:id", async(req,res)=>{
 try{
   const data = await Complaint.find({userId:req.params.id});
   res.json(data);
 }catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= START SERVER ========= */
app.listen(process.env.PORT,()=>{
 console.log(`🚀 Backend running on port ${process.env.PORT}`);
});