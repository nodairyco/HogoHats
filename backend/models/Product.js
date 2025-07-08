const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: String, 
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids', 'permium']
    },
    }, {
        timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);