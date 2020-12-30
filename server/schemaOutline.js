const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    name: String, 
    category: [String], 
    description: String, 
    link: String
})

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;
