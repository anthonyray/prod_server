var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var annotationSchema = new mongoose.Schema({
  song : { type : Schema.Types.ObjectId, ref : 'Song'},
  type : { type : String, required : true, enum : ['Sample','FX','Synth']},
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
});

module.exports = mongoose.model('Annotation', annotationSchema);
