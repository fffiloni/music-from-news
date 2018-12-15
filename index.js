console.log("The bot is running...");
// Twit package
const news = [];
require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/website'));

io.on('connection', function(socket){
  console.log('a user connected');
  // socket.on('giveData', function(){
  //   io.emit('takeData', news);
  // });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/botpage', getBotData);


var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { follow: ['38395124', '24744541', '34867057', '68440549', '338985020', '133663801'] })

stream.on('tweet', function (tweet) {
  news.push(tweet.id);
  io.emit('takeData', tweet.id);
  console.log(tweet.text);
  console.log(news);
})

setInterval(function(){
  news.splice (0, 1);
  console.log("removed 5 ids from older stamp.")
}, 10000);


function getBotData(request, response){


    response.send(sendCoucou());



}

function sendCoucou(){
  setInterval(function(){
    console.log("coucou");
  }, 5000);
}
