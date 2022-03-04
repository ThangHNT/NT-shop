const mongoose = require('../connectToMongooseDB.js');
const Schema = mongoose.Schema;

const Cart = new Schema ({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    product: [{type: Schema.Types.ObjectId, ref:'Product'}],
})

module.exports = mongoose.model('Cart',Cart);
