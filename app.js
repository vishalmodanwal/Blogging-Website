//jshint esversion:6
const express = require('express');
//Routes
const authRoutes = require('./routes/auth-routes');
const composeRoutes = require('./routes/compose-routes');
const profileRoutes = require('./routes/profile-routes');
const postRoutes = require('./routes/post-routes');
const homeRoutes = require('./routes/home-route');
const contactRoutes = require('./routes/contact-route');
const aboutRoutes = require('./routes/about-route');
const userprofileRoutes=require('./routes/user_profile-route');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { isNull } = require('lodash');


const fileId= mongoose.Types.ObjectId;
const app = express();

// set up view engne
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true,useUnifiedTopology: true },
app.use(express.static("public"));
//set up routes
app.use('/auth', authRoutes);
app.use('/compose',composeRoutes);
app.use('/profile', profileRoutes);
app.use('/post',postRoutes);
app.use('/',homeRoutes);
app.use('/contact',contactRoutes);
app.use('/about',aboutRoutes);
app.use('/user-profile',userprofileRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// connect mongoosedb
mongoose.connect(keys.mongodb.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to mongodb");
});
mongoose.set('useFindAndModify', false);


app.listen(3000, function () {
  console.log("Server started on port 3000");
});






