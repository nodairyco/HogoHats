const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    const files = req.files;

    // Validate required fields
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Validate images
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Images must be an array with at least one image.' });
    }

    // Validate category
    const validCategories = ['men', 'women', 'kids', 'premium'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category.' });
    }
    // Validate price
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    try {
        const images = files.map(file => {
            if (!file.path) {
                throw new Error('Each image must have a path.');
            }
            return {
                url: file.path,
                public_id: file.filename || null
            };
        });

        const product = new Product({
            name,
            description,
            price: numericPrice,
            images: images,
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
    const { name, description, price, category } = req.body;
    const files = req.files;

    // Validate required fields
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Validate images
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Images must be an array with at least one image.' });
    }

    // Validate category
    const validCategories = ['men', 'women', 'kids', 'premium'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category.' });
    }
    // Validate price
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (existingProduct.images && existingProduct.images.length > 0) {
            const deletePromises = existingProduct.images.map(image => {
                if (image.public_id) {
                    return cloudinary.uploader.destroy(image.public_id);
                }
            });
            await Promise.all(deletePromises);
        }

        let images = [];
        if (files && files.length > 0) {
            images = files.map(file => {
                if (!file.path) {
                    throw new Error('Each image must have a path.');
                }
                return {
                    url: file.path,
                    public_id: file.filename || null
                };
            });
        }

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price: numericPrice,
            images: images,
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
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map(image => {
                if (image.public_id) {
                    return cloudinary.uploader.destroy(image.public_id);
                }
            });
            
            await Promise.all(deletePromises);
        }

        await Product.findByIdAndDelete(id);
        

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