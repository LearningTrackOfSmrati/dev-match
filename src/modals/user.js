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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40pruthvimandaliya007%2Fjavascript-interview-question-event-loop-853cc845b075&psig=AOvVaw0bZU6TkCRtUbGYfS4VULCS&ust=1755877498558000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOD4scefnI8DFQAAAAAdAAAAABAE"
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

userSchema.methods.validatePassword=function(passwordEnteredByUser){
    const user=this;
    const isPassword = bcrypt.compare(passwordEnteredByUser, user.password);
    return isPassword;
}
module.exports = mongoose.model("User", userSchema); 