const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,      
            required: true
        },
        price: {
            type: Number,   
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        }},
    ],
    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,  
            required: true
        },  
    },
    paymentMethod: {
        type: String,
        required: true 
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'manufacturing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentIntentId: {
        type: String
    },
    stripeSessionId: {
        type: String
    },
    subtotal: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;