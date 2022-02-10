const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Address = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User'},
    receiverName: {type: String, default: '', required: true, maxlength: 50},
    phoneNumber:{type:String, default: '', required: true, maxlength: 12},
    city: {type: String, required: true, default: '', maxlength: 50},
    district: {type: String, required: true, default:'', maxlength: 50},
    detail: {type: String, default: '' ,maxlength: 100}
});

module.exports = mongoose.model('Address',Address);