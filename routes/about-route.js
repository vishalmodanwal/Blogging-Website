const router=require('express').Router();

const aboutContent = "A blogging web site where user can create blog and post it to the site. It's fully RESTful web app. User can also edit and delete their own blog post. key feature: User can create, update, read, and delete the content. User can also insert Image url. Authentication with email ";

router.get('/', function (req, res) {
    res.render("about", { about: aboutContent });
  })
module.exports=router;