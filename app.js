// Declare which node modules are going to be used
var express = require('express'),
     path = require('path'),
     mongoose = require('mongoose'),
     logger = require('morgan'),
     app = require('express')();

// Use this file to route
var routes = require('./modules/routes');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
// Express serves files in directories specified below
// this is so our server knows where to look for certain files
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(express.static(path.join(__dirname, 'app')));

// Use this file to know where to route
app.use('/', routes);

// Listen on the port we set 
server.listen(port);
console.log('Server started on ' + port);

// Error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html');
});
// **************************************************************\\

var db = require('./modules/db');
// Register the user as a mongoose model which holds our schema
var user = mongoose.model('Users', db.user);
// Register the message as a mongoose model which holds our schema
var message = mongoose.model('Messages', db.message);

var numUsers=0;
var numMessages=0;

io.on('connection', function (socket) {

  socket.on('setNickname', function(data){
    users = new user({
       nickname: data,
       ip: socket.handshake.address
    });
    
    users.save(function (err, data) {
      if (err){
        console.log(err);
      }else {
        console.log('Saved ', data );
      }
    });
    
    numUsers++;
    socket.broadcast.emit('join', data);
    
  });
  
  socket.on('sendMessage', function(data) {
    
    var newMessage = new message({
        nickname: data.nickname,
        date: data.date,
        text: data.text
      });
      
    newMessage.save(function (err, data) {
      if (err){
        console.log(err);
      }else {
        console.log('Saved ', data);
      }
    });
    
    numMessages++;
    socket.broadcast.emit('reciveMessage', newMessage);
  });
});
module.exports = app;