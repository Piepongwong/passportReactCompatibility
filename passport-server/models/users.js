const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema({
    username:  String,
    password: String,
    slackId: String,
    fbId: String
  });


var User  = mongoose.model('User', schema)

module.exports = User