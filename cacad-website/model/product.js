var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    imgUrl: String,
    title: String,
    price: Number,
    likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Product', product);
