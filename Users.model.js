var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var usersSchema = new Schema({
  username: String,
  password: String
})

usersSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', usersSchema)
