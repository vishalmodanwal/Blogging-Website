const mongoose=require('mongoose');
const { db } = require('./post-modle');
const Post=require('./post-modle')
const Schema=mongoose.Schema;
const userShema=new Schema({
    username:String,
    googleid:String,
    thumbnail:String,
    posts: [
        { 
      title:String,
    imgurl:String,
    content:String, 
        }
    ]
});

const User=mongoose.model("user",userShema);
module.exports=User;


 