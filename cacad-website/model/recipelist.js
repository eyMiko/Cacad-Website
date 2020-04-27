var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var recipeList = new Schema({
  title: {type: String, default: "Cool Recipe List"},
  products: [{type: ObjectId, ref: 'Product'}] //reference to product.js; has to be exact
});

module.exports = mongoose.model('RecipeList', recipeList);
