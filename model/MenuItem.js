const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menutype: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }
    
});

module.exports = mongoose.model('MenuItem', menuSchema);