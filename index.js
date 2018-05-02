var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var oldMsg = []

            
io.on('connection', function(socket) {
  io.emit("oldMsg", oldMsg);
  console.log("New client has connected with id:",socket.id);
  
  socket.on('chat', function(username, message) {
     console.log("New player has state:",message);
    
    console.log('message received, sent by: ' + username + ', content: ' + message);
   // oldMsg.push('message received, sent by: ' + username + ', content: ' + message);
    io.emit('chat', username, message);
  });
  setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
  
    socket.on('change', function(player, count) {
  //  console.log('message received, sent by: ' + username + ', content: ' + message);
   // oldMsg.push('message received, sent by: ' + username + ', content: ' + message);
    io.emit('change', player, count);
  });
  
 socket.on('ademola', function(gme){
    io.emit('ademola', gme);
  });
  
   socket.on('newplayer', function(posx){
    io.emit('newplayer', posx);
  });
  socket.on('rotation', function(rot){
    io.emit('rotation', rot);
  });
   socket.on('posdata', function(data){
    io.emit('posdata', data);
  });
socket.on('control', function(player){
    io.emit('control', player);
  });
  socket.on('player', function(spawn){
    io.emit('player', spawn);
  });
    socket.on('bot', function(position){
    io.emit('bot', position);
  });
  //broadcast alert messages to all users!
  socket.on('broadcast', function(msg){
    io.emit('broadcast', msg);
  });
 socket.on('hunts', function(me){
    io.emit('hunts', me);
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
