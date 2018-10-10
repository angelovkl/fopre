var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compiles(str, path) {
  return stylus(str).set('filesname', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extendet:true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compiles: compiles()
  }
))
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/pro1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivison db opened');
});
//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.Message('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//  mongoMessage = messageDoc.message;
//})

app.get('views/partials/:partialPath', function(req,res){
  res.render('views/partials/' + req.params.partialPath);
});

app.get('*', function(req,res){
  res.render('index.jade', {
    //mongoMessage: mongoMessage
  });
});
var port = 3030;
app.listen(port);
console.log('Listening to port ', + port + '...');
