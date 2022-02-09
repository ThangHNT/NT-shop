const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Address = new Schema({
    city: {type: String, required: true, default: ''},
    district: {type: String, required: true, default:''},
    detail: {type: String, default: ''}
});

module.exports = mongoose.model('Address',Address);