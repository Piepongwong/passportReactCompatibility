var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config.json')

router.get("/login", function(req, res){
    res.send(`

        <form method="POST" action="/user/login">
            <input name="password" value="password"/>
            <input name="username" value="username"/>
            <input type='submit' value='submit' />
        </form>
    
    `)
})

module.exports = router