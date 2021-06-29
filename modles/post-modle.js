const mongoose=require('mongoose');
const postsSchema=new mongoose.Schema({
    title:String,
    imgurl:String,
    content:String,
    comments:[
      {
      comment_by:String,
      comment:String,
      }
    ],
    like:Number,
    dislike:Number,
    thumbnail:String,
  
  });
const Post=mongoose.model("post",postsSchema);
module.exports=Post;