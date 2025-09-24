const express = require("express");

const app = express();

app.get("/getUserData", (req,res)=>{
    try {
        throw new Error("djkbdk");
        res.send("User data send");
    } catch(err){
        res.status(500).send("something went wrong ok");
    }
})

app.use("/", (err, req, res, next)=>{
    if(err){
        //Log your errors
        // this wildcard handling should always be in the end as this will handle any corner case
        res.status(500).send("Something went wrong");
    }
})
app.listen(3000, ()=>{
    console.log("success");
})