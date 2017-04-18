var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var recipeSchema = new Schema({
  name: String,
  category: String,
  ingredients: [{
    quantity: String,
    measurementType: String,
    name: String
  }],
  steps: [{
    number: String,
    step: String
  }],
  owner: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Recipe', recipeSchema);
