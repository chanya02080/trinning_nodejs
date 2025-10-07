const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: { type: String },
    approved: { 
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)