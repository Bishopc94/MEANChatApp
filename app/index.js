var socket = io.connect();
var myNickname;
$(function() {
  $('#newMessage').hide();
});
function setNickname() {
  
  
  //******* Write this
  
  if ($('#nicknameInput').val() != "") {
    myNickname = $('#nicknameInput').val();
    socket.emit('setNickname', myNickname);
    $('#newMessage').show();
    $('#newNickname').hide();
  }
  $('#nicknameInput').val('')
  
  
  
  
  
}
function sendMessage() {
  
  
  
  //******* Write this
  var date = new Date().toISOString();
  var message = {nickname: myNickname, date: date, text: $('#messageInput').val()};
  if(message != ""){
    socket.emit( 'sendMessage', message);
    addMessage('Me', message.text);
  }
  $('#messageInput').val('');
  
  
  
  
}
function addMessage(nickName, msg) {
  $('#chatEntries').append('<div class="message"><p>' + nickName + ': ' + msg + '</p></div>');
}



 //******* Write this
socket.on('join', function(data){
  var message = 'has joined.'
  addMessage(data.nickname, message);
});
socket.on('reciveMessage', function(data){
  addMessage(data.nickname, data.text);
});