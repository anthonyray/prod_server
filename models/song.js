var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = null;

var songSchema = new mongoose.Schema({
  title : { type : String, required : true },
  album : { type : String },
  upvotes : {type : Number, default : 0}
  
});

module.exports = mongoose.model('Song', songSchema);
