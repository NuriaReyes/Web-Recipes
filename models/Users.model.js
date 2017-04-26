var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var usersSchema = new Schema({
  username: String,
  password: String,
  recipes: [{type: ObjectId, ref: 'Recipe'}]
});

module.exports = mongoose.model('User', usersSchema);
