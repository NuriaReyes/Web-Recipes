var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var usersSchema = new Schema({
  username: String,
  password: String,
  recipes: [{type: ObjectId, ref: 'Recipe'}]
});

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', usersSchema);
