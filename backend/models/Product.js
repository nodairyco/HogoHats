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
  stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    }, {
        timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);