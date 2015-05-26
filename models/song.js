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

  annotations : [
    {
      type : { type : String, required : true, enum : ['Sample','FX','Synth'], default : 'Synth'},
      description : { type : String, default: 'Empty description'},
      upvotes : { type : Number, default : 0, min : 0},
      submitter : { type : String, ref : 'User'},
      start : { type : Number, default : 0, min: 0},
      stop : { type : Number , default : 0, min: 0},
      comments : [{
        body : {type : String},
        created : { type: Date, default: Date.now },
        submitter : {type : Schema.Types.ObjectId, ref :'User'},
        votes : {type : Number}
      }]
    }
  ],

  created : { type: Date, default: Date.now },

  submitter : { type : Schema.Types.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Song', songSchema);
