const router=require('express').Router();

const contactContent = ""

router.get('/', function (req, res) {
    res.render("contact", { contact: contactContent });
  });

module.exports=router;