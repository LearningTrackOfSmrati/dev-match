const express = require("express");
const app = express();
app.listen(3000, ()=>{
    console.log("Success")
})
app.use("/user", (req, res, next)=>{
    console.log("1")
    next();
    res.send("Response1");
    
})

app.use("/user", (req, res, next)=>{
    console.log("2")
    next();
    res.send("Response2");
    
})

app.use("/user", (req, res, next)=>{
    console.log("3")
    next();
    res.send("Response3");
})

app.use("/user", (req, res, next)=>{
    console.log("4")
    next();
    res.send("Response4");
})

app.use("/user", (req, res, next)=>{
    console.log("5")
    res.send("Response5");
})



//here in line no. 7 we are using next();, which will set the response as Response2, then for line no. 8 it'll throw error.
//If next is not there, we'll get response as Response1 , and line no.12 we'll get error.