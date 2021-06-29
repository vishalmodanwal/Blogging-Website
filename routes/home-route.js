const router=require('express').Router();
const mongoose = require('mongoose');
const Post = require('../modles/post-modle');
const User = require('../modles/user-modle');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const homeStartingContent = "Welcome to Bloging Website! Here is the some Blog if we want to see more blog of a person then click on profile pic";

router.get('/', function (req, res) {
    if (req.user) {
      Post.find({}, function (err, postitem) {
        if (!err) {
          //  console.log(req.user);
          res.render("home", { StartingContent: homeStartingContent, posts: postitem, user: req.user });
          //console.log("Successfully saved default item in DB");
        }
        else {
          console.log(err);
        }
      });
    } else {
      res.redirect("auth/login");
    }
  
  });
  
  
module.exports=router;