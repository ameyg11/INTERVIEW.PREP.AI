const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7D" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    }catch(err){
        res.status(500).json({ message: "Server Error", err: err.message });
    }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(500).json({ message: "Invalid email or password" });
        }
        // console.log(user);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).json({ message: "Invalid email or password" });
        }

        // Return user with data
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    }catch(err){
         res.status(500).json({ message: "Server Error", err: err.message });
    }
};

// @desc    Get user profile
// @route   POST /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }catch(err){
         res.status(500).json({ message: "Server Error", err: err.message });
    }
};


module.exports = { registerUser, loginUser, getUserProfile };