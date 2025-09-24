const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../modals/connectionRequest");
const USER_SAFE_DATA="firstName lastName age about";
const User = require("../modals/user");
//Get all the pending request for loggedIn User
userRouter.get("/user/requests", userAuth, async (req,res)=>{
try{
    const loggedInUser = req.user;

    const conReq = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({message: "user requests are:", data:conReq})
}catch(err){
    res.status(400).send(err.message);
}
})

userRouter.get("/user/connections", userAuth, async (req, res)=>{

    try {
    const loggedInUser = req.user;

    const conReq = await ConnectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id, status:"accepted"},
            {fromUserId: loggedInUser._id, status:"accepted"},
        ]
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = conReq.map((row)=>{
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
    })
    res.json({data: data})
}catch(err){
    res.status(400).send(err.message);
}
})

userRouter.get("/feed", userAuth, async (req,res)=>{
    try{

        let loggedInUser=req.user;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        limit>50? 50 : limit;
        const skip = (page-1)*limit;
        const currentConnectionsRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUsers = new Set(); 
        currentConnectionsRequest.forEach((row)=>{
            hideUsers.add(row.fromUserId.toString());
            hideUsers.add(row.toUserId.toString());
        })

        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUsers)}},
                 {_id:{$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.send(users)
    }catch(err){
      res.status(400).send("Error in feed");
    }
})
module.exports=userRouter;