var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId

var recipeSchema = new Schema({
  name: String,
  type: String,
  link: String,
  ingredients: [String],
  steps: [String],
  owner: {type: ObjectId, ref: 'User'}
})

recipeSchema.index({ name: 'text', ingredients: 'text' })

module.exports = mongoose.model('Recipe', recipeSchema)
