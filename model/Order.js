const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('Order', orderSchema);