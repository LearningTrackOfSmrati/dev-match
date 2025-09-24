const express = require("express");
const {authAdmin, userAuth} = require("./middlewares/auth");
const app = express();
app.use("./admin", authAdmin)
app.post("user/login", (req, res)=>{
    res.send("User logged in successfully");
})
app.get("/user", userAuth, (req,res)=>{
    res.send("Data user send successfully");
})
app.get("/admin/getAllData", (req,res)=>{
    res.send("send a user");
   
   
})

app.get("/admin/deleteUser", (req,res)=>{
    res.send("Delete a user");
})

app.listen(3000, ()=>{
    console.log("Success done")
});