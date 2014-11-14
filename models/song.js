var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = null;

var songSchema = new mongoose.Schema({

  artist : { type : Schema.Types.ObjectId, ref : 'Artist'},

  producer : { type : Schema.Types.ObjectId, ref : 'Artist'},

  title : { type : String, required : true },

  album : { type : String },

  upvotes : {type : Number, default : 0},

  media : {
    source : { type : String, required : true, enum : ['youtube','soundcloud','deezer'] },
    url : { type : String, required : true}
  },

  annotations : [{type : Schema.Types.ObjectId, ref : 'Annotation'}],

  created : { type: Date, default: Date.now },

  submitter : { type : Schema.Types.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Song', songSchema);
