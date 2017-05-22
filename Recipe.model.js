var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var recipeSchema = new Schema({
  name: String,
  category: String,
  link: String,
  ingredients: [{
    ingredient: String
  }],
  steps: [{
    step: String
  }],
  owner: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Recipe', recipeSchema);
