const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, admin, upload.array('images'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, admin, upload.array('images'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;