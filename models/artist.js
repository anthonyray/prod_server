var mongoose = require('mongoose'), Schema = mongoose.Schema;

var artistSchema = new mongoose.Schema({
  name : { type : String, required : true}
});

module.exports = mongoose.model('Artist', artistSchema);
