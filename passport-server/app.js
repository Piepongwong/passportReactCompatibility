var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport")
var LocalStrategy = require('passport-local').Strategy;
var SlackStrategy = require('passport-slack').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var SpotifyStrategy = require('passport-spotify').Strategy;
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const User = require("./models/users.js")
var config = require("./config.json")
mongoose.connect('mongodb://localhost:27017/passport-demo', function(err){
    if(err) console.log(err)
    else console.log("Connected")
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/user/login")
    }
}

if(config.environment === "dev") {
    console.log("Setting Cors for Dev Environment")
    app.use(require("cors")({
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:3000/", "localhost:3000/", "http://localhost:3001"]
    }))
}

passport.use(new SlackStrategy({
    clientID: config.slack.clientID,
    clientSecret: config.slack.clientSecret,
    skipUserProfile: false, // default
    scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'] // default
  },
  (accessToken, refreshToken, profile, done) => {
    // optionally persist user data into a database
    User.find({slackId: profile.id}, function(err, result){
        if(err) done(err, false)
        else if (result.length > 0) done(null, result[0])
        else if( result.length == 0) {
            User.create({slackId: profile.id}, function(err, createdUser) {
                done(null, createdUser)
            })
        } else {
            done(null, false)
        }
    })
  }
))

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.find({username: username}, function(err, result) {
            if(err) done(err, false) 
            else if(result.length == 0) done(null, false)
            else if (result[0].password === password){
                done(null, result[0]);
            } 
            else {
                done(null, false)
            }   
        })
      })
);

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: `${config.baseUrl}/user/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, {username: "test"});
    }
))

passport.use(
    new SpotifyStrategy(
      {
        clientID: config.spotify.clientID,
        clientSecret: config.spotify.clientSecret,
        callbackURL: `${config.baseUrl}/user/auth/spotify/callback`
      },
      
      function(accessToken, refreshToken, expires_in, profile, done) {
        User.find({spotifyId: profile.id}, function(err, result){
            if(err) done(err, false)
            else if (result.length > 0) done(null, result[0])
            else if( result.length == 0) {
                User.create({slackId: profile.id}, function(err, createdUser) {
                    done(null, createdUser)
                })
            } else {
                done(null, false)
            }
        })
      }
    )
  );
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/user', require('./routes/user'))
app.use('/user', require('./routes/login'))

config.environment = "production"
if(config.environment == "production") {
    app.use(express.static(path.join(__dirname, 'react-client')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/react-client', 'index.html'));
    })   
}

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null,  user)
}); 

module.exports = app;
