const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

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

        const emailToken = jwt.sign({ userId: user._id }, process.env.EMAIL_SECRET_KEY, {
            expiresIn: '15m',
        });
        const verifyUrl = `http://localhost:5050/api/users/verify-email?token=${emailToken}`; // temporary placeholder
        await sendEmail(user.email, 'Verify Your Email', `Click here to verify your email: <a href="${verifyUrl}">${verifyUrl}</a>`);


        // const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: '15m'
        // });

        // const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        // user.refreshToken = refreshToken;
        // await user.save();

        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        // });

        // res.status(201).json({
        //     _id: user._id,
        //     username: user.username,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     accessToken
        // });

        res.status(201).json({
            message: 'Registered successfully. Please verify your email before logging in.'
        });
    } catch (err){
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' , err: err.message });
    }
}

const verifyUserEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
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
    catch (err) {
        res.status(500).json({ message: 'Server error', err: err.message });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_SECRET_KEY, {
        expiresIn: '15m'
    });

    const resetUrl = `http://localhost:5050/reset-password?token=${resetToken}`;
    await sendEmail(user.email, 'Reset Your Password', `Click here: ${resetUrl}`);

    res.status(200).json({ message: 'Password reset link sent to email' });
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.RESET_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};


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
    } catch {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    resetPassword,
    forgotPassword,
    verifyUserEmail
};