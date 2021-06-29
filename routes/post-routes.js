const router=require('express').Router();
const mongoose = require('mongoose');
const Post = require('../modles/post-modle');
const User = require('../modles/user-modle');
const Like = require('../modles/like-modle');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.post("/:postId/delete", function (req, res) {
  const requestedPostId = req.params.postId;
//console.log(req.params.postId);
  Like.remove(   {postID: requestedPostId},(err)=>{
    if(err)
    console.log(err);
  }); 

  Post.findByIdAndRemove({ _id: requestedPostId }, function (err,post) {
    if (err)
      console.log(err);
  }
  )
  //console.log(req.body.userid);
  User.updateOne({_id:req.body.userid},{ $pull: {posts: {_id:requestedPostId} }}, (err) => {
    if (err) {
        return res.status(500).json({ error: 'error in deleting posts' });
    };
});
 
  res.redirect('/profile');
}
);


router.post("/:postId/comment", function (req, res) {
  const requestedPostId = req.params.postId;
  const comment = req.body.comment;
 const comment_by=req.body.comment_by;
 //console.log("comment_by" + req.body.comment_by);
  Post.findByIdAndUpdate({ _id: requestedPostId },
    { $push: { comments:{"comment_by":comment_by,"comment": comment} } }, function (err, doc) {
      if (!err)
        console.log(doc);
    }
  )
  // res.redirect('/');
  let route =  "/post/" + requestedPostId;
  res.redirect(route);
}
);
router.post("/:postId/like", function (req, res) {
  const gmailid = req.body.id;
  const requestedPostId = req.params.postId;

  Like.findOne({ userID: gmailid, postID: requestedPostId }, function (err, poststatus) {
    if (!err) {
      if (poststatus == null || poststatus.like == 0) {
        const like = new Like({
          userID: gmailid,
          postID: requestedPostId,
          like: 1,
          dislike: 0
        });
        like.save();
        Post.findById({ _id: requestedPostId }, function (err, post) {
          if (err) return handleError(err);

          post.like += 1;
          post.save(function (err) {
            if (err) return handleError(err);
          });
        });
      }
    }
    let route = "/post/" + requestedPostId;
    res.redirect(route);
  })

});
router.post("/:postId/dislike", function (req, res) {
  const gmailid = req.body.id;
  const requestedPostId = req.params.postId;

  Like.findOne({ userID: gmailid, postID: requestedPostId }, function (err, poststatus) {
    if (!err) {
      if (poststatus == null || poststatus.like == 0) {
        const like = new Like({
          userID: gmailid,
          postID: requestedPostId,
          like: 1,
          dislike: 1
        });
        like.save();
        Post.findById({ _id: requestedPostId }, function (err, post) {
          if (err) return handleError(err);

          post.dislike += 1;
          post.save(function (err) {
            if (err) return handleError(err);
          });
        });
      }
    }
    let route =  "/post/" + requestedPostId;
    res.redirect(route);
  })
});

router.get("/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {

    res.render("post", {
      thumbnail: post.thumbnail,
      title: post.title,
      imgurl:post.imgurl,
      content: post.content,
      postID: post.id,
      comments: post.comments,
      like: post.like,
      dislike: post.dislike,
      comment: post.no_comment,
      user: req.user
    });
  });
});

router.post("/:postId/edit", (req, res) => {
  Post.updateOne(
    { _id: req.params.postId },
    {$set:req.body},
       (err)=>{
            if(!err){
              let route =  "/post/" + req.params.postId;
           } else{
               res.send(err);
           }
       }
    )
    User.updateOne({posts:{$push:{$set:req.body}} }, (err) => {
       // console.log("ID:" +req.params.postId);
           if(err)
      res.send(err);
      })
      res.redirect('/profile')
  })


module.exports=router;