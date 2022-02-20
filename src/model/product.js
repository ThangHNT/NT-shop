const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String, default: '', required: true},
    shortDescription:{type: String, default: '', required: true},
    longDescription:[{title:String,content:String}],
    price: {type: String,default: '0', required: true},
    discount: {type: String, default: '0'},
    totalAmount: {type: String, default: '', required: true},
    deliveryFrom: {type: String, default: '', required: true},
    brand: {type: String, default: '', required: true},
    sold: {type: String, default: ''},
    available: {type: String, default: ''},
    genus:[{name:String,amount:String}],
    detail:[{title:String,content:String,default:''}],
    img: [{type: String, default: ''}],
    img_base64 :[{data: Buffer,contentType: String,src:String,}]
});

module.exports = mongoose.model('Product',Product);