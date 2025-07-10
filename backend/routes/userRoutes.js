const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { registerUser, loginUser, refreshToken, logoutUser, verifyUserEmail, forgotPassword, resetPassword } = require('../controllers/userController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created user with tokens
 *       400:
 *         description: Missing fields or user exists
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with tokens
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: No refresh token provided
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user, clear refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       403:
 *         description: Invalid or expired refresh token
 */
router.post('/logout', protect, logoutUser);

router.get('/verify-email', verifyUserEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/check-admin', protect, (req, res) => {
    res.json({ isAdmin: req.user.isAdmin });
});

module.exports = router;