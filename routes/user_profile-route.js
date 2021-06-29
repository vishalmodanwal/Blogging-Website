const router=require('express').Router();
const mongoose = require('mongoose');
const Post = require('../modles/post-modle');
const User = require('../modles/user-modle');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", function (req, res) {
    User.findOne({thumbnail: req.body.thumbnail},(err,user)=>{
       res.render('user-profile',{posts:user.posts,user:user});
    });
});
module.exports=router;