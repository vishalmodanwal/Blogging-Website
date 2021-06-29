const router=require('express').Router();
const mongoose = require('mongoose');
const Post = require('../modles/post-modle');
const User = require('../modles/user-modle');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const authCheck=(req,res,next)=>{
    if(!req.user){
     // if user not logged in
     res.redirect('/auth/login');
    }else{
        // if logged in
        next();
    }

};

router.get('/',authCheck,(req,res) =>{
    User.findOne({_id: req.user._id},(err,user)=>{
       //console.log(user.posts);
        res.render('profile',{user:req.user,posts:user.posts});
    });
});
module.exports=router;