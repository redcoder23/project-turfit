const express = require('express');
const router = express.Router();
const History = require('../models/history');

// Get all history records
router.get('/', async (req, res) => {
    try {
        const history = await History.find().populate('user', 'name email'); 
       return res.status(200).json({ message: 'History records retrieved', history });
    } catch (error) {
        console.error('Error fetching history:', error);
       return res.status(500).json({ error: 'Could not fetch history' });
    }
});

// Get history for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const userHistory = await History.find({ user: req.params.userId }).sort({ date: -1 });
        if (!userHistory.length) {
            return res.status(404).json({ error: 'No history found for this user' });
        }
       return res.status(200).json({ message: 'User history retrieved', userHistory });
    } catch (error) {
        console.error('Error fetching user history:', error);
       return res.status(500).json({ error: 'Could not fetch user history' });
    }
});

// Add a new history record
router.post('/', async (req, res) => {
    try {
        const { user, action } = req.body;
        const newHistory = new History({ user, action });
        const savedHistory = await newHistory.save();
     return   res.status(201).json({ message: 'History record added', savedHistory });
    } catch (error) {
        console.error('Error adding history:', error);
       return  res.status(500).json({ error: 'Could not add history record' });
    }
});

//delete a history 
router.delete('/:id', async (req, res) => {
    try { 
        const id = req.params.id.trim();   

        const fidel = await History.findOne({ _id: id }); 

        if (!fidel) 
            return res.status(404).json({ message: 'No such history found' });

        const del = await History.deleteOne({ _id: id }); 

        return res.status(200).json({ message: 'Required history record deleted successfully' });
    } catch (error) {
        console.error('Error deleting history:', error);
        return res.status(500).json({ error: 'Could not delete history' });
    }
});


module.exports = router;
