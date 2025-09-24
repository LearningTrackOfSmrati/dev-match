const mongoose = require("mongoose");

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://NamahNode:$mraTi123@namahnode.g80cnge.mongodb.net/dev-match");
}
module.exports = connectDB;
