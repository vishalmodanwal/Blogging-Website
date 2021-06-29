const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../modles/user-modle');
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(!err){
            done(null,user);
        }
        
    });
});

passport.use(
new GoogleStrategy({
    //option for google start
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret,
    callbackURL:'/auth/google/redirect'
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function
   // check if user already exist in our db
   User.findOne({googleid:profile.id}).then((currentUser)=>{
       if(currentUser){
           // already have the user
          // console.log('user is:' , currentUser);
           done(null,currentUser);
       }else{
           // if not create user in our db
           new User({
            username:profile.displayName,
            googleid:profile.id,
            thumbnail:profile._json.picture,
            posts:[]
        }).save().then((newUser)=>{
           // console.log('created new user:', newUser);
            done(null,newUser);
        });
        }
   })
  })
);