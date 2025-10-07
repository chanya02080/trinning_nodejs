const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    nameProduct: { type: String },
    price: { type: Number },
    stock: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);
