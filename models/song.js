var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = null;

var songSchema = new mongoose.Schema({
  artist_id : Schema.Types.ObjectId,
  producer_id : Schema.Types.ObjectId,
  title : { type : String, required : true },
  album : { type : String },
  upvotes : {type : Number, default : 0},
  media : {
    source : { type : String, required : true, enum : ['youtube','soundcloud','deezer'] },
    url : { type : String, required : true}
  }
});

module.exports = mongoose.model('Song', songSchema);
