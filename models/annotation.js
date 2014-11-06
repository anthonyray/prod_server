var mongoose = require('mongoose'), Schema = mongoose.Schema;

var annotationSchema = new mongoose.Schema({
  type : { type : String, required : true, enum : ['Sample','FX','Synth']},
  description : { type : String, default: 'Empty description'},
  upvotes : { type : Number, default : 0, min : 0},
  submitter : { type : String, ref : 'User'},
  start : { type : Number, default : 0, min: 0},
  stop : { type : Number , default : 0, min: 0}
});

module.exports = mongoose.model('Annotation', annotationSchema);
