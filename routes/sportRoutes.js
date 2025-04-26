const express = require('express');
const router = express.Router();
const Sport  = require('../models/sport');

// Get all sports
router.get('/', async (req, res) => {
    try {
        const sports = await Sport.find();
        if (sports.length === 0) {
            return res.status(404).json({ error: 'No sports found' });
        }
        res.status(200).json({ message: 'Sports retrieved successfully', sports });
    } catch (error) {
        console.error('Error retrieving sports:', error);
        res.status(500).json({ error: 'Could not retrieve sports' });
    }
});

// Get sport by name
router.get('/:name', async (req, res) => {
    try {  
        const name = req.params.name.trim().toLowerCase();
        const sport = await Sport.findOne({ name });
        if (!sport) {
            return res.status(404).json({ error: 'No such sport exists' });
        }
        res.status(200).json({ message: 'Sport found', sport });
    } catch (error) {
        console.error('Error retrieving sport:', error);
        res.status(500).json({ error: 'Could not retrieve the sport' });
    }
});

// Delete sport by name
router.delete('/:name', async (req, res) => {
    try {
        const name = req.params.name.trim().toLowerCase();
        const sport = await Sport.deleteOne({ name });
        if (sport.deletedCount === 0) {
            return res.status(404).json({ error: 'No such sport exists' });
        }
        res.status(200).json({ message: 'Sport deleted successfully' });
    } catch (error) {
        console.error('Error deleting sport:', error);
        res.status(500).json({ error: 'Could not delete the sport' });
    }
});

// Insert a new sport
router.post('/', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No fields provided in the request body' });
        }  
        
        const name = req.body.name.trim().toLowerCase();
        const exist = await Sport.findOne({ name });
        if (exist) {
            return res.status(400).json({ error: 'Sport already exists' });
        }   
        
        const newSport = new Sport({
            name: name,
            equipments: req.body.equipments
        });
        await newSport.save();
        res.status(201).json({ message: 'Sport added successfully', newSport });
    } catch (error) {
        console.error('Error adding sport:', error);
        res.status(500).json({ error: 'Could not add the sport' });
    }
});

module.exports = router;
