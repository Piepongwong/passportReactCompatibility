var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config.json')

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/user/login");
    }
}
router.post('/login', passport.authenticate('local'),
    function(req, res,next) {
    res.redirect('/');
});

router.post('/login-react', passport.authenticate('local'), (req,res)=> {
    res.send(200)
});

router.get("/profile", checkAuthentication, function(req, res) {
    res.send("profile" + req.session.passport.user.username)
})

router.get("/auth/isloggedin", (req, res)=> {
    if(req.isAuthenticated()) {
        res.status(200).end()
    } else (
        res.status(403).end()
    )
})

router.get("/auth/spotify", passport.authenticate("spotify"));
router.get("/auth/spotify/callback", passport.authenticate("spotify"), function(req, res){
    console.log("Authenticated with Spotify")
    res.redirect(`${config.reactUrl}`)
});

router.get("/auth/slack", passport.authenticate("slack"));
router.get("/auth/slack/callback", passport.authenticate("slack"), function(req, res){
    console.log("Authenticated with Slack")
    res.redirect(`${config.reactUrl}`)
});

router.get('/auth/facebook',passport.authenticate('facebook'))
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: config.reactUrl,
                                      failureRedirect: config.reactUrl }));
module.exports = router;
