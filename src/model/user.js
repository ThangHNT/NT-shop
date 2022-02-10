const mongoose = require('../connectToMongooseDB');
const Schema = mongoose.Schema;

const User = new Schema({
    username:{type: String, required: true,maxlength:50},
    phoneNumber:{type:String,maxlength: 11, default:'0123456789'},
    email: {type:String, default:''},
    gender:{type:String},
    dayOfBirth:{type:String, maxlength: 2, default:'01'},
    monthOfBirth:{type:String, maxlength:2, default:'01'},
    yearOfBirth:{type:String, maxlength: 4,default:'2000'},
    seller:{type:Boolean},
    bankAccount:{type:String},
    purchaseOrder:[{type:Schema.Types.ObjectId, ref:'Product'}],
    address:[{type:Schema.Types.ObjectId, ref:'Address', index:true}],
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
