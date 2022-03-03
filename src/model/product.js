const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String, default: '', required: true},
    introduction:{type: String, default: '', required: true},
    owner:{type: Schema.Types.ObjectId, ref:'shop'},
    description:{type:String,default: '', required: true},
    price: {type: String,default: '0', required: true},
    discount: {amount:String, unit:String},
    totalAmount: {type: String, default: '', required: true},
    deliveryFrom: {type: String, default: '', required: true},
    madeIn:{type:String,default: '', required: true},
    brand: {type: String, default: '',required: true},
    available: {type: String, default: ''},
    category:{type:String, default: '',required:true},
    img: [{type: String, default: ''}],
    img_base64 :[{data: Buffer,contentType: String,src:String,}]
});

module.exports = mongoose.model('Product',Product);