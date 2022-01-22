const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String, default: '', required: true},
    shortDescription:{type: String, default: '', required: true},
    price: {type: String,default: '0', required: true},
    discount: {type: String, default: '0'},
    img :{
        data: Buffer,
        contentType: String,
        src:String,
    }
});

module.exports = mongoose.model('Product',Product);