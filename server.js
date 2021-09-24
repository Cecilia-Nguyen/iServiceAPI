const express = require('express');
const path = require('path');
const https = require("https")
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./model/User');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'SECRET' 
  }));

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false
}));
  
  const passport = require('passport');
  var userProfile;
  
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/success', (req, res) =>  res.render('home', { name:  userProfile.displayName}));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '403000446022-rjv5blvodsr9988034jr2uvb080j392a.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'DmRPl9BHZ2zZUHs4fn-xU0on';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    let user=User.find({email: profile.emails[0].value});
    console.log("\n\n\n"+user.firstName);
    new User({
      firstName: profile.name.givenName,
      lastName:profile.name.familyName,
      email:profile.emails[0].value,
    }).save().then((newUser)=>{
        console.log('new user created' + newUser);
    });
    
    
    
    
      userProfile=profile;
      return done(null, userProfile);
    
    
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) =>{
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
const mongoose = require('mongoose');
const url = 'mongodb+srv://admin-Cecilia:Cr020199@cluster0.nazzt.mongodb.net/iService?retryWrites=true&w=majority';
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((p) => {
		console.log(p);
	});
app.use(express.static(path.join(__dirname, 'public')));
const regRouter = require('./routes/Route');
const authRouter = require('./routes/auth');

app.set('view engine', 'ejs');
app.get('/',function(req, res){
	res.redirect('/register');
});

app.use('/experts', regRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
	res.redirect('/auth/login');
});

app.listen(5000, (req,res) => {
	console.log('Server is running');
});
