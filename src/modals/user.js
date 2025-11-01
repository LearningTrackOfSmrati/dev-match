const mongoose =  require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,//unique will give index automatically
        lowercase: true, 
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:"+value)
            }
        }
    },

    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value){
         if(!validator.isURL(value)){
            throw new Error("Not a valid URL")
         }
        },
        default: "https://media.istockphoto.com/id/690897378/photo/i-take-my-spiritually-very-seriously.jpg?s=612x612&w=0&k=20&c=Oga5fOiSB-lDq5mBYcyV7pvnijUfFMbpVXmoMhFM-mc="
    },
    about: {
        type: String,
        default:"This is a default about of the user!",
    },
    skills: {
        type: [String]
    },
   
},
{ 
    timestamps:true,
}
)

userSchema.index({firstName:1, lastName:1});
userSchema.methods.getJWTToken= async function () {
  const user = this;
  const token = await jwt.sign({_id:user._id}, "DEV@Match$790", {expiresIn: "7d"});
  return token;
}

userSchema.methods.validatePassword=async function(passwordEnteredByUser){
    const user=this;
   
    const isPassword = await bcrypt.compare(passwordEnteredByUser, user.password);
    return isPassword;
}
module.exports = mongoose.model("User", userSchema); 