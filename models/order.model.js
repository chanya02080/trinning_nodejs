const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);
