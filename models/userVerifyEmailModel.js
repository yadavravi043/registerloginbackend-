const mongoose = require("mongoose");
const Schema = mongoose.Schema
const userVerificationSchema = new Schema({
  userId: String,
  uniqueString:String,
  createdAt:date,
  expiresAt:Date

 
  
});

module.exports = mongoose.model("userVerification", userVerificationSchema);
