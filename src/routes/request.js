const express=require("express");
const requestRouter=express.Router();
const User = require("../modals/user")
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../modals/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
   try{
    const fromUserId=req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    })
 
    const allowedStatus=["interested","ignored"];
    if(!allowedStatus.includes(status)) {
    res.status(400).json({message:"invalid status", status})
    }

    //if sending request to an invalid user
    const toUser = await User.findById(toUserId);
    console.log(toUser,"sddsshfjqhdgjkgcjwdgchjwqvjhweyj");
    if(!toUser){
        return res.status(400).json({
            message: "User not found",
        })
    }
    //handling if user sending again the same request or users can not send request vise versa)
    const exsistingConnection = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId},
        ],
    })
    if(exsistingConnection){
        return res.status(400).send({message:"Connection request already exist!!"})
    }
    const data = await connectionRequest.save();

    res.json({
        message: req.user.firstName + " is" + status + " in " + toUser.firstName,
        data,
    })
   }catch(err){
    res.status(400).send("Error:" + err.message); 
   }
    
   
})

const mongoose = require("mongoose");

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const { status, requestId } = req.params;
        const loggedInUser = req.user;

        console.log("Incoming status:", status);
        console.log("Incoming requestId:", requestId);
        console.log("Logged in user:", loggedInUser._id);

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status is invalid!!" });
        }

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ message: "Invalid requestId" });
        }

        const ConnectionRequestData = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested", // must match exactly what's saved
        });

        if (!ConnectionRequestData) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        ConnectionRequestData.status = status;
        const data = await ConnectionRequestData.save();

        res.json({ message: "Connection request " + status, data });
    } catch (err) {
        console.error("Error in /request/review:", err);
        res.status(500).json({ message: "Connection request catch error " + err.message });
    }
});


module.exports=requestRouter;