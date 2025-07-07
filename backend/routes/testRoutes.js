//delete this line before deploying
// This file is for testing JWT and admin middleware functionality.
// It should be removed before deploying to production.
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're authenticated!` });
});

router.get('/admin-only', protect, admin, (req, res) => {
  res.json({ message: `Welcome admin ${req.user.username}!` });
});

module.exports = router;
