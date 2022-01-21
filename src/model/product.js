const mongoose = require('../connectToDB.js');

const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String, default: '', required: true},
    description:{type: String, default: '', required: true},
    price: {type: String,default: '0', required: true},
    discount: {type: String, default: '0'},
});

module.exports = mongoose.model('Product',Product);