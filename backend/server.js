require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

/* ========= FILE UPLOAD SETUP ========= */

const storage = multer.diskStorage({
 destination:(req,file,cb)=>{
  cb(null,"uploads/");
 },
 filename:(req,file,cb)=>{
  cb(null, Date.now()+path.extname(file.originalname));
 }
});

const upload = multer({storage});
app.use("/uploads", express.static("uploads"));

/* ========= CONNECT MONGODB ========= */

const MONGO_URL =
process.env.MONGO_URL ||
"mongodb+srv://Keerthika:keerthi123%40@cluster0.uvfegyv.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URL)
.then(()=>console.log("✅ MongoDB Connected"))
.catch(err=>console.log("❌ Mongo Error:", err.message));

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
 type:String,
 priority:String,
 address:String,
 landmark:String,
 photo:String,              // ✅ photo field
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
   const newUser = await User.create({name,email,password:hash});

   res.json({message:"✅ Registered Successfully", user:newUser});
 }
 catch(err){
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
 }
 catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= ADD COMPLAINT WITH PHOTO ========= */

app.post("/api/complaint", upload.single("photo"), async(req,res)=>{
 try{
   const {
     userId,title,description,
     type,priority,address,landmark
   } = req.body;

   if(!userId || !title)
     return res.status(400).send("Missing fields");

   const photo = req.file ? req.file.filename : "";

   const complaint = await Complaint.create({
     userId,title,description,
     type,priority,address,landmark,
     photo
   });

   res.json({message:"✅ Complaint Added", complaint});
 }
 catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= GET MY COMPLAINTS ========= */

app.get("/api/myComplaints/:id", async(req,res)=>{
 try{
   const data = await Complaint.find({userId:req.params.id});
   res.json(data);
 }
 catch(err){
   res.status(500).send(err.message);
 }
});

app.get("/api/allComplaints", async(req,res)=>{
 try{
   const data = await Complaint.find().sort({createdAt:-1});
   res.json(data);
 }catch(err){
   res.status(500).send(err.message);
 }
});

/* ========= START SERVER ========= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log("🚀 Backend running on port", PORT);
});