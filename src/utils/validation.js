const validator=require("validator");
const validateSignUpData =(req)=>{

    const {firstName, lastName, emailId, password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!!Enter full name");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid");
    }
}

const ValidUserInput =(req)=>{
    const allowUpdates = ["firstName", "lastName", "age", "skills", "about"];
    const isValidInput= Object.keys(req.body).every((field)=>allowUpdates.includes(field));
    return isValidInput;
}
module.exports = 
    validateSignUpData;
    ValidUserInput;
