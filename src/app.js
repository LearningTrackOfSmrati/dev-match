const express = require("express");
const connectDB = require("./config/database");
const app = express();
const  User = require("./modals/user")
const cors = require('cors')
const cookieParser = require("cookie-parser");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter= require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


app.get("/user", async (req,res)=>{
    const _id = req.body._id;
    try{
        const user = await User.findById({_id})
        res.send(user);
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
})

app.get("/feed", async (req,res)=>{
   try{
        const user = await User.find({})
        res.send(user);
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
})

app.delete("/user", async (req,res)=>{
    const _id = req.body._id;
    try{
         const user = await User.findByIdAndDelete({_id})
        res.send("deleted successfully");
     }catch(err){
         res.status(400).send("Error saving the user:"+ err.message)
     }
 })

 app.patch("/user/:userId", async (req,res)=>{
    const _id = req.params.userId;
    try{
        const ALLOWED_UPDATES=["photoUrl","gender","about","age","password","skills"];
        const isUpdateAllowed = Object.keys(req.body).every((k)=>ALLOWED_UPDATES.includes(k));
        console.log(req.body?.skills.length)
        if(!isUpdateAllowed){
           throw new Error("Update not allowed")
        }
        if(req.body?.skills.length>4){
            throw new Error("skills can not be more than 4")
        }
        const user = await User.findByIdAndUpdate({_id}, req.body, { returnDocument:"after", runValidators:true});
        //console.log(user);
        res.send("data updated sucessfully");
    }catch(err){
        res.status(400).send("Error while updating"+ err.message);
    }
 })
connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(3000, ()=>{
        console.log("Server is listening onn port 3000...");
    })
 }).catch((err)=>{
    console.log("Database cannot be connected!!");
 })

