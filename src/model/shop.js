const mongoose = require('../connectToDB');
const Schema = mongoose.Schema;

const Shop = new Schema({
    brand:{type: String,required:true},
    owner:{type:String, required:true},
    products:[{type:Schema.Types.ObjectId, ref:'Product'}],
    address: {type:String, required:true}
})

module.exports = mongoose.model('Shop',Shop);