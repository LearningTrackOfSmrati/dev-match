const jwt = require("jsonwebtoken");
const User = require("../modals/user")
const authAdmin = (req,res,next)=>{
    const token = "xyz";
    const isAuth = token === "xyz";
    if(isAuth){
        next();
    } else {
        res.status(401).send("Unautherizesd request");
    }
}

const userAuth = async (req,res,next)=>{
try{
  const {token} = req.cookies;
  if(!token){
     return res.status(401).send("Please login again");
  }
  const decodedId = await jwt.verify(token, "DEV@Match$790");
  const {_id} = decodedId;
  const user = await User.findById({_id});
  if(!user){
    throw new Error("User is not available");
  }
  req.user = user;
  next();
}catch(err){
    res.status(400).send("Error:"+ err.message);
}
}
module.exports={
    authAdmin,
    userAuth
}