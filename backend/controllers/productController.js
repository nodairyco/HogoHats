const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, description, price, imageUrl, category } = req.body;

    // Validate required fields
    if (!name || !price || !imageUrl || !category) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
    // Validate category
    const validCategories = ['men', 'women', 'kids', 'premium'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category.' });
    }
    // Validate price
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    try {
        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            category
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imageUrl, category } = req.body;

    // Validate required fields
    if (!name || !price || !imageUrl || !category) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
    // Validate category
    const validCategories = ['men', 'women', 'kids', 'premium'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category.' });
    }
    // Validate price
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            imageUrl,
            category
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};  