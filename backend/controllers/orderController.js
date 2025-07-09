const Order = require('../models/Order');
const Product = require('../models/Product');

const calculateTotalPrice = async (orderItems) => {
    let subtotal = 0;

    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error(`Product not found for ID: ${item.product}`);
        }

        if(product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}. requested ${item.quantity}, available ${product.stock}`);
        }

        subtotal += product.price * item.quantity;
    }

    const shippingCost = 10.00;
    const totalAmount = subtotal + shippingCost;

    return { subtotal, shippingCost, totalAmount };
};

// @desc    Create a new order  
// @route   POST /api/orders
// @access  Private (User must be authenticated)
const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items provided.' });
        }

        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: 'Shipping address and payment method are required.' });
        }

        const { subtotal, shippingCost, totalAmount } = await calculateTotalPrice(orderItems);

        const order = new Order({
            user: req.user._id,
            orderItems : orderItems.map(item => ({
                ...item,
                product: item.product, 
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            subtotal,
            shippingCost,
            totalAmount,
            orderStatus: 'pending'
        });

        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product && product.stock > item.quantity) {
                product.stock -= item.quantity;
                await product.save();
            } else {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}. Requested ${item.quantity}, available ${product.stock}` });
            }
        }

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User must be authenticated)
const getOrderById = async (req, res) => {
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('user', 'name email')
            .populate('orderItems.product', 'name price images');  

        if (order){
            if(order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'You do not have permission to view this order.' });
            }
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found.' });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get all orders for the authenticated user
// @route   GET /api/orders/myorders
// @access  Private (User must be authenticated)
const getMyOrders = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(orders);
    }catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only)
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus) {
        return res.status(400).json({ message: 'Order status is required.' });
    }

    try {
        const order = await Order.findById(id);

        const validStatuses = ['pending', 'confirmed', 'manufacturing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: `Invalid order status. Valid statuses are: ${validStatuses.join(', ')}` });
        }

        if (order) {
            if (orderStatus === 'cancelled' && order.orderStatus !== 'cancelled') {
                //if paid refund logic would go here

                for (const item of order.orderItems) {
                    const product = await Product.findById(item.product);   
                    if (product) {
                        product.stock += item.quantity;
                        await product.save();
                    } else {
                        console.warn(`Product with ID ${item.product} not found for restocking.`);
                    }
                }
            }
            order.orderStatus = orderStatus;
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found.' });
        } 
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};