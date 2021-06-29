const router=require('express').Router();
const mongoose = require('mongoose');
const Post = require('../modles/post-modle');
const User = require('../modles/user-modle');
const Like = require('../modles/like-modle');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {
    // console.log('user is:'+req.user);
    const user = req.user;
    if (user) {
      res.render("compose", { user: user });
    }
    else {
      res.redirect('/');
    }
  });
  
  router.post('/', function (req, res) {
    const id = req.body.id;
    User.findOne({ _id: id }, function (err, user) {
      img = user.thumbnail;
      //console.log("img:  " + img);
      const title = req.body.postTitle;
      const content = req.body.postBody;
      const imgurl=req.body.imgurl;
      console.log(imgurl);
      const post = new Post({
        thumbnail: img,
        imgurl:imgurl,
        title: title,
        content: content,
        comments: [],
        like: 0,
        dislike: 0,
        no_comment: 0
      });
      post.save();
  
      User.findOne({ _id: id }, function (err, founduser) {
        console.log('post:' + post);
       //console.log('founduser: ' + founduser);
        founduser.posts.push(post);
        founduser.save();
        res.redirect("/");
      });
    })
  });
  

module.exports=router;