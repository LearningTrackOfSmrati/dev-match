const express = require("express");

const app = express();


app.use("/fog",(req,res)=>{ 
    res.send("Namaste ");
})
app.use("/test",(req,res)=>{ 
    res.send("Hello From the server");
})
app.use("/",(req,res)=>{ 
    res.send("Pranam");
})
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port");
});