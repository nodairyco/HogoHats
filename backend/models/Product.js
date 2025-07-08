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
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }
    }
    ],
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids', 'premium']
    },
    }, {
        timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);