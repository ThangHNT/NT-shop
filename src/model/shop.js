const mongoose = require('../connectToMongooseDB.js');
const Schema = mongoose.Schema;

const Shop = new Schema({
    brand:{type: String,required:true,maxlength: 50},
    owner:{type:Schema.Types.ObjectId, ref:'Seller'},
    products:[{type:Schema.Types.ObjectId, ref:'Product'}],
    address: {type:String, required:true,maxlength: 100},
    phoneContact: {type: String, required:true, default:'',maxlength: 15},
    avatar_base64 :{data: Buffer,contentType: String,}
})

module.exports = mongoose.model('Shop',Shop);