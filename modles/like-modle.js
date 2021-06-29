const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    postID:String,
    userID:String,
    like:Number,
    dislike:Number
  });
const Like=mongoose.model("like",likeSchema);
module.exports=Like;