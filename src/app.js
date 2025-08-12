const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res)=>{
    console.log(req.query);
    console.log(req.params);
    res.send({firstName: "Smrati", lastName:" Tiwari"});
})
//In use?r , ? will make e optional in user, call will work with usr too
//In ab+c , + means now abbbbbc will also work, i can add multiple letter befor +
//ab*cd means you can write anything between ab and cd
//a(bc)d, bc is optional, ad will also work
//we can write regex too in place of user...like ".*fly$", means anything which start with * or end with fly will work, also /a/ means anything which have a will work...
app.post("/user", (req,res)=>{
    res.send("Data saved succesfully");
})
app.delete("/user", (req,res)=>{
    res.send("Deleted succesfully");
})
app.patch("/user", (req,res)=>{
    res.send("patch succesfully");
})
app.put("/user", (req,res)=>{
    res.send("put succesfully");
})
app.use("/fog",(req,res)=>{ 
    res.send("Namaste ");
})

//use will match all the HTTP methods, like get post put patch delete... so for get we need to use get
app.use("/test",(req,res)=>{ 
    res.send("Hello From the server");
})

// app.use("/",(req,res)=>{ 
//     res.send("Pranam");
// })
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port");
});