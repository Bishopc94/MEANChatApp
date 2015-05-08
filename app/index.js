var socket = io.connect();
var myNickname;
$(function() {
  $('#newMessage').hide();
});
function setNickname() {
  if ($('#nicknameInput').val() != "") {
    myNickname = $('#nicknameInput').val();
    socket.emit('setNickname', myNickname);
    $('#newMessage').show();
    $('#newNickname').hide();
  }
  $('#nicknameInput').val('')
  
}
function sendMessage() {
  var date = new Date().toISOString();
  var message = {nickname: myNickname, date: date, text: $('#messageInput').val()};
  if(message != ""){
    socket.emit( 'sendMessage', message);
    addMessage('Me', message.text);
  }
  $('#messageInput').val('');
  
}
function addMessage(nickName, msg) {
  $('#chatEntries').append("<div class='message' id=" + nickname + "><p>" + nickname + ": " + msg + "</p></div>");
}
socket.on('join', function(data){
  var message = 'has joined.'
  addMessage(data, message);
});
socket.on('reciveMessage', function(data){
  addMessage(data.nickname, data.text);
});