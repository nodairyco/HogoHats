const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne ({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken
        });

    } catch{
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken
        });
    }
    catch{
        res.status(500).json({ message: 'Server error' });
    }
}

const logoutUser = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        } catch {
            res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {expiresIn: '15m'});
        res.status(200).json({ accessToken });
    }catch {
        res.status(403).json({ message: 'Invalid or exipred refresh token' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser
};