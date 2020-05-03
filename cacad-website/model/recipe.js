var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipe = new Schema({
  imgUrl: String,
  name: String,
  ingredients: String,
  likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Recipe', recipe)
