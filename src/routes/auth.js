const express = require("express");
const authRouter= express.Router();
const validateSignUpData = require("../utils/validation");
const bcrypt = require("bcrypt");
const  User = require("../modals/user");
const { userAuth } = require("../middlewares/auth");


authRouter.post("/signUp", async (req, res)=>{
    try{
        validateSignUpData(req);
        const {firstName, lastName, emailId,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        console.log(hashPassword);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword,
        });
       
        await user.save();
        res.send("User Added Successfully!");
    }catch(err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
  
});

authRouter.post("/login", async (req, res)=> {
    try {
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPassword = user.validatePassword(password);
        if(isPassword){
            const token = await user.getJWTToken();
            res.cookie("token", token,{
                expires: new Date(Date.now()+8*3600000),
            });
            res.send("login successfully!!");
        }else{
            throw new Error("Invalid credentials");
        }
    }catch(err){
        res.status(400).send("Error in login the user:"+ err.message);
    }
})

authRouter.post("/logout", async (req,res)=>{

res.cookie("token", null, {
    expires : new Date(Date.now()),
}).send("logout successfully");

})

module.exports = authRouter;