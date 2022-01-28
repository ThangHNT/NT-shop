const mongoose = require('../connectToMongooseDB');
const Schema = mongoose.Schema;

const User = new Schema({
    username:{type: String, required: true,maxlength:50},
    phoneNumber:{type:String,maxlength: 11},
    gender:{type:String},
    dayOfBirth:{type:String, maxlength: 2},
    monthOfBirth:{type:String, maxlength:2},
    yearOfBirth:{type:String, maxlength: 4},
    seller:{type:Boolean},
    address:[{type: String, maxlength:200}],
    bankAccount:{type:String},
    purchaseOrder:[{type:Schema.Types.ObjectId, ref:'Product'}],
    authType:{type:String},
    facebookId:{type:String},
    googleId:{type:String},
    avatar:{type:String},
    avatar_base64:{
        data:Buffer,
        contentType:String
    }
})

module.exports = mongoose.model('User',User);
