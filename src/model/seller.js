const mongoose = require('../connectToMongooseDB.js');
const Schema = mongoose.Schema;

const Seller = new Schema({
    name:{type:String, required:true, default:'',maxlength: 50},
    identity:{type:String, required:true, default:'',maxlength: 20},
    email:{type:String, required:true, default:'', maxlength: 30},
    shop:{type:Schema.Types.ObjectId, ref : 'Shop'},
})

module.exports = mongoose.model('Seller',Seller);