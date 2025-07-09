const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getOrderById, updateOrderToPaid, getMyOrders,
    getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById).put(protect, admin, updateOrderStatus);

module.exports = router;