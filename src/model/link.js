const mongoose = require('../connectToMongooseDB.js');

const Schema = mongoose.Schema;
const Link = new Schema({
    href: {type: 'string', default: '', maxlength: 200},
    note: {type: 'string', default: '', maxlength: 200}
});

module.exports = mongoose.model('Link',Link);