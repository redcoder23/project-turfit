const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Could not retrieve users' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {  
        const id=req.params.id.trim();
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User retrieved', user });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Could not retrieve user' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, favoriteSports } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Create new user only if not existing
        const newUser = new User({ name, email, phone, favoriteSports });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Could not create user' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {  
        const id=req.params.id.trim(); 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User updated', updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Could not update user' });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {  
        const id=req.params.id.trim() ;
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Could not delete user' });
    }
});

module.exports = router;
