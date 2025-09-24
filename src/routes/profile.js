const express = require("express");
const profileRouter= express.Router();
const ValidUserInput = require("../utils/validation")
const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res)=>{
    try {  
            const user = req.user;
            if(!user){
                throw new Error("User does not exist!!");
            }
            res.send(user);
        
    }catch(err) {
        res.status(400).send("Error in login the user:"+ err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!ValidUserInput){
            throw new Error("Input is not valid!!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((i)=>(loggedInUser[i] = req.body[i]));
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName},your profile updated successfully`,
            data: loggedInUser,
        })
    }catch(err){
        res.status(400).send("Error in login the user:"+ err.message);
    }


})



module.exports=profileRouter;