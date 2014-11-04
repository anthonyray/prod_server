var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/prod');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
  console.log("Connected to the database ...");
});
