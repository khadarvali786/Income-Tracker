const {model} =require("mongoose")

const userSchema = require("../Schema/userSchema");

const userModel = new model("User",userSchema);

module.exports = userModel;