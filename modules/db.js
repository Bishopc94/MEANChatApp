var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://45.55.205.177/ChatApp');
var dbCollection = db.collections;
var Schema = mongoose.Schema;

// Create user Schema
var usersSchema = new Schema({
  nickname: String,
  ip: String
});

// Create message schema
var messagesSchema = new Schema({
  nickname: String,
  date: String,
  text: String
});

// Send object literal
module.exports={user:usersSchema, message:messagesSchema};